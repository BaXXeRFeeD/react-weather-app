import AQICard from './AQICard';
import { useI18n } from "../../context/I18nContext.jsx";

const WeatherMetrics = ({ current, air, units }) => {
    const { t } = useI18n();

    const { main, wind } = current;
    const windSpeedConverted = units === 'metric' ? (wind.speed * 3.6).toFixed(2) : wind.speed.toFixed(2);
    const unitSpeed = units === 'metric' ? t('kmh') : t('mph');

    return (
        <div className="p-4 rounded-3xl shadow-lg bg-gray-300 dark:bg-gray-700 grid grid-cols-2 gap-4">
            <div className="text-center">
                <p className="font-medium">{t('humidity')}</p>
                <p className="font-bold text-xl">{main.humidity}%</p>
                <img src="https://img.icons8.com/ios/50/humidity.png" alt={t('humidity')} className="mx-auto w-12 h-12 object-contain dark:invert" />
            </div>

            <div className="text-center">
                <p className="font-medium">{t('windSpeed')}</p>
                <p className="font-bold text-xl">
                    {windSpeedConverted} {unitSpeed}
                </p>
                <div style={{ transform: `rotate(${wind.deg}deg)` }} className="mx-auto w-12 h-12">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 4L4 12M12 4L20 12M12 4V20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="text-center">
                <p className="font-medium">{t('pressure')}</p>
                <p className="font-bold text-xl">{main.pressure} {t('hpa')}</p>
                <img src="https://img.icons8.com/ios/50/pressure.png" alt={t('pressure')} className="mx-auto w-12 h-12 object-contain dark:invert" />
            </div>

            <AQICard aqi={air.list[0].main.aqi} />
        </div>
    );
};

export default WeatherMetrics;