import dayjs from 'dayjs';
import ForecastDayCard from './ForecastDayCard';
import {useI18n} from "../../context/I18nContext.jsx";

const ForecastList = ({ forecast, units }) => {
    const { lang, setLang, t } = useI18n();
    const daily = {};

    forecast.list.forEach((item) => {
        const day = dayjs(item.dt * 1000).format('YYYY-MM-DD');
        if (!daily[day]) daily[day] = [];
        daily[day].push(item);
    });

    const days = Object.keys(daily).slice(1, 6);
    return (
        <div className="p-4 rounded-3xl shadow-lg bg-gray-300 dark:bg-gray-700">
            <h2 className="text-3xl font-bold">{t('fiveDaysForecast')}</h2>
            <div className="space-y-4 mt-4">
                {days.map((day) => {
                    const items = daily[day];
                    const temps = items.map(i => i.main.temp);
                    const maxTemp = Math.round(Math.max(...temps));
                    const icon = items.find(i => dayjs(i.dt * 1000).hour() === 12) ?.weather[0].icon || items[0].weather[0].icon;
                    const date = dayjs(day).format('dddd, D MMM');
                    return <ForecastDayCard key={day} date={date} temp={maxTemp} icon={icon} units={units} />;
                })}
            </div>
        </div>
    );
};

export default ForecastList;