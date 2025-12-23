import { useUnits } from '../../context/UnitsContext';
import { useI18n } from '../../context/I18nContext.jsx';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SearchBar from '../search/SearchBar';
import { useEffect } from 'react';

const Header = ({ onSearch, onCurrentLocation, history }) => {
    const { units, setUnits } = useUnits();
    const { lang, setLang, t } = useI18n();
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const toggleUnits = () => setUnits(units === 'metric' ? 'imperial' : 'metric');
    const toggleLang = () => setLang(lang === 'en' ? 'ru' : 'en');

    return (
        <header className="flex items-center justify-between p-4 bg-transparent">
            <div className="flex items-center space-x-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">{t('mode')} {theme.toUpperCase()}</span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={units === 'imperial'} onChange={toggleUnits} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">{units === 'metric' ? '°C' : '°F'}</span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={lang === 'ru'} onChange={toggleLang} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">{lang.toUpperCase()}</span>
                </label>
            </div>
            <SearchBar onSearch={onSearch} history={history} />
            <button onClick={onCurrentLocation} className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <span>{t('currentLocation')}</span>
            </button>
        </header>
    );
};

export default Header;