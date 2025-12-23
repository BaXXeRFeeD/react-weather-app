import SunCycle from './SunCycle';
import {useI18n} from "../../context/I18nContext.jsx";

const CurrentWeatherCard = ({ current, units }) => {
    const { main, weather, sys } = current;
    const icon = weather[0].icon;
    const description = weather[0].description;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const unitSymbol = units === 'metric' ? '°C' : '°F';
    const { t } = useI18n()

    return (
        <div className="p-4 rounded-3xl shadow-lg bg-gray-300 dark:bg-gray-700 flex flex-col items-center">
            <p className="text-8xl font-bold gradient-text">{temp}{unitSymbol}</p>
            <p className="text-2xl opacity-80">{t('feeelslike')}: {feelsLike}{unitSymbol}</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt={description} className="w-40 h-40" />
            <p className="text-3xl font-bold">{description}</p>
            <SunCycle sunrise={sys.sunrise} sunset={sys.sunset} />
        </div>
    );
};

export default CurrentWeatherCard;