import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import CurrentWeatherCard from './components/weather/CurrentWeatherCard';
import WeatherMetrics from './components/weather/WeatherMetrics';
import ForecastList from './components/weather/ForecastList';
import Loader from './components/common/Loader';
import ErrorState from './components/common/ErrorState';
import EmptyState from './components/common/EmptyState';
import { useGeolocation } from './hooks/useGeolocation';
import { useI18n } from './context/I18nContext.jsx';
import { useWeather } from './hooks/useWeather';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useUnits } from './context/UnitsContext.jsx';
import dayjs from 'dayjs';

const App = () => {
    const { position, error: geoError } = useGeolocation();
    const { units } = useUnits();
    const { t, lang } = useI18n();
    const online = useOnlineStatus();

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [currentCityData, setCurrentCityData] = useState(null);
    const [history, setHistory] = useLocalStorage('history', []);
    const [geoLoading, setGeoLoading] = useState(true);

    const { current, forecast, air } = useWeather(lat, lon, units, lang);

    useEffect(() => {
        setGeoLoading(true);
        if (position) {
            setLat(position.latitude);
            setLon(position.longitude);
            const apiKey = import.meta.env.VITE_OWM_API_KEY;
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.latitude}&lon=${position.longitude}&limit=1&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    if (data[0]) {
                        setCurrentCityData(data[0]);
                        addToHistory(data[0]);
                    }
                    setGeoLoading(false);
                })
                .catch(() => setGeoLoading(false));
        } else if (geoError) {
            setLat(37.9838);
            setLon(23.7275);
            setCurrentCityData({ name: 'Athens' });
            setGeoLoading(false);
        }
    }, [position, geoError]);

    const addToHistory = (cityData) => {
        const updated = [cityData, ...history.filter(c => c.name !== cityData.name)].slice(0, 10);
        setHistory(updated);
    };

    const resolveCityData = async (lat, lon) => {
        const apiKey = import.meta.env.VITE_OWM_API_KEY;
        const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
        );
        const data = await res.json();
        return data?.[0] ?? null;
    };

    const handleSearch = async (newLat, newLon, cityData) => {
        setLat(newLat);
        setLon(newLon);

        const finalCity = cityData?.name ? cityData : await resolveCityData(newLat, newLon);
        if (finalCity?.name) {
            setCurrentCityData(finalCity);
            addToHistory(finalCity);
        }
    };

    const handleCurrentLocation = async () => {
        if (!position) {
            if (geoError) console.error(geoError);
            return;
        }

        const newLat = position.latitude;
        const newLon = position.longitude;

        setLat(newLat);
        setLon(newLon);

        const finalCity = await resolveCityData(newLat, newLon);
        if (finalCity?.name) {
            setCurrentCityData(finalCity);
            addToHistory(finalCity);
        }
    };

    if (!online) return <ErrorState message={t('offline')} />;

    if (geoLoading || current.loading || forecast.loading || air.loading) return <Loader />;

    if (geoError) return <ErrorState message={geoError} />; // Показываем ошибку geo

    if (current.error || forecast.error || air.error) return <ErrorState message={t('errorFetching')} />;

    if (!current.data || !currentCityData) return <EmptyState />;

    const currentTime = dayjs().format('HH:mm');
    const currentDate = dayjs().format('dddd, D MMM');

    const displayCity = currentCityData?.local_names?.[lang] || currentCityData?.name || 'Unknown';

    return (
        <div className="min-h-screen p-4">
            <Header onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} history={history} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-3xl shadow-lg bg-gray-300 dark:bg-gray-700">
                    <h2 className="text-4xl font-bold">{displayCity}</h2>
                    <p className="text-8xl font-bold">{currentTime}</p>
                    <p className="text-2xl">{currentDate}</p>
                </div>
                <CurrentWeatherCard current={current.data} units={units} />
                <WeatherMetrics current={current.data} air={air.data} units={units} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <ForecastList forecast={forecast.data} units={units} />
                <div className="p-4 rounded-3xl shadow-lg bg-gray-300 dark:bg-gray-700">
                    <h2 className="text-3xl font-bold">{t('hourlyForecast')}</h2>
                    <div className="flex overflow-x-auto space-x-4 mt-4">
                        {forecast.data?.list.slice(0, 5).map((item, i) => {
                            const hour = dayjs(item.dt * 1000).format('HH:00');
                            const temp = Math.round(item.main.temp);
                            const icon = item.weather[0].icon;
                            const windSpeedConverted = units === 'metric' ? (item.wind.speed * 3.6).toFixed(2) : item.wind.speed.toFixed(2);
                            const windUnit = units === 'metric' ? t('kmh') : t('mph');
                            const windDeg = item.wind.deg;
                            const gradient = temp > 25 ? 'bg-gradient-to-b from-orange-600 to-yellow-100' : temp < 20 ? 'bg-gradient-to-b from-blue-800 to-blue-200' : 'bg-gradient-to-b from-purple-700 to-blue-200';
                            return (
                                <div key={i} className={`p-4 rounded-3xl shadow-lg w-32 flex flex-col items-center ${gradient} text-black dark:text-white`}>
                                    <p className="text-2xl font-bold">{hour}</p>
                                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" className="w-20 h-20" />
                                    <p className="text-xl font-bold">{temp}°</p>
                                    <p>{windSpeedConverted} {windUnit}</p>
                                    <div style={{ transform: `rotate(${windDeg}deg)` }} className="w-8 h-8">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4L4 12M12 4L20 12M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;