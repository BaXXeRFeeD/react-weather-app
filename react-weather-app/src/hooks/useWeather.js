import { useFetchJson } from './useFetchJson';

export const useWeather = (lat, lon, units, lang) => {
    const apiKey = import.meta.env.VITE_OWM_API_KEY;
    const base = 'https://api.openweathermap.org/data/2.5';
    const currentUrl = lat && lon ? `${base}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}` : null;
    const forecastUrl = lat && lon ? `${base}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}` : null;
    const airUrl = lat && lon ? `${base}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}` : null;

    const current = useFetchJson(currentUrl, [lat, lon, units, lang]);
    const forecast = useFetchJson(forecastUrl, [lat, lon, units, lang]);
    const air = useFetchJson(airUrl, [lat, lon]);

    return { current, forecast, air };
};