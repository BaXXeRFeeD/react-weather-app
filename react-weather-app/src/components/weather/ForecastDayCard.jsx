const ForecastDayCard = ({ date, temp, icon, units }) => {
    const unitSymbol = units === 'metric' ? '°C' : '°F';

    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" className="w-12 h-12" />
            <p className="font-bold">{date}</p>
            <p className="font-bold ml-auto">{temp}{unitSymbol}</p>
        </div>
    );
};

export default ForecastDayCard;