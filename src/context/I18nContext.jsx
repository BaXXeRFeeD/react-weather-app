import {createContext, useContext, useEffect} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/ru';

const translations = {
    en: {
        searchPlaceholder: "Search for your preferred city...",
        currentLocation: "Current Location",
        hourlyForecast: "Hourly Forecast",
        mode: "Mode",
        offline: "FYou are offline",
        errorFetching: "Error fetching data",
        fiveDaysForecast: "5 Days Forecast",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        pressure: "Pressure",
        airQuality: "Air Quality",
        sunrise: "Sunrise",
        sunset: "Sunset",
        noData: "No data available",
        loading: "Loading...",
        kmh: 'km/h',
        mph: 'mph',
        hpa: 'hPa',
        good: 'Good',
        fair: 'Fair',
        moderate: 'Moderate',
        poor: 'Poor',
        veryPoor: 'Very Poor',
        feeelslike: 'Feels like',
    },
    ru: {
        searchPlaceholder: "Поиск вашего любимого города...",
        currentLocation: "Текущее местоположение",
        hourlyForecast: "Почасовой прогноз",
        mode: "Режим",
        offline: "Вы оффлайн",
        errorFetching: "Ошибка получения данных",
        fiveDaysForecast: "Прогноз на 5 дней",
        humidity: "Влажность",
        windSpeed: "Скорость ветра",
        pressure: "Давление",
        airQuality: "Качество воздуха",
        sunrise: "Восход",
        sunset: "Закат",
        noData: "Данные отсутствуют",
        loading: "Загрузка...",
        kmh: 'км/ч',
        mph: 'миль/ч',
        hpa: 'гПа',
        good: 'Хорошо',
        fair: 'Нормально',
        moderate: 'Умеренно',
        poor: 'Плохо',
        veryPoor: 'Очень плохо',
        feeelslike: 'Чувствуется как',
    },
};

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
    const [lang, setLang] = useLocalStorage('lang', 'en');
    const t = (key) => translations[lang][key] || key;

    useEffect(() => {
        dayjs.locale(lang);
    }, [lang]);

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);