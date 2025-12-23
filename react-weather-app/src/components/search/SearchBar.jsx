import {useEffect, useState} from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useFetchJson } from '../../hooks/useFetchJson';
import SearchSuggestions from './SearchSuggestions';
import { useI18n } from '../../context/I18nContext.jsx';

const SearchBar = ({ onSearch, history }) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedQuery = useDebounce(query, 400);
    const { t, lang } = useI18n();

    const apiKey = import.meta.env.VITE_OWM_API_KEY;
    const searchUrl = debouncedQuery ? `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=5&appid=${apiKey}` : null;

    const { data, loading } = useFetchJson(searchUrl, [debouncedQuery]);

    const suggestions = debouncedQuery ? (data || []) : (showSuggestions ? history : []);

    const handleSelect = (city) => {
        onSearch(city.lat, city.lon, city.local_names?.[lang] || city.name);
        setQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-1/2">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Спрячь при блюре (delay для клика на li)
                placeholder={t('searchPlaceholder')}
                className="w-full px-4 py-3 rounded-full border bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow-lg"
            />
            {loading && <p className="absolute">Loading...</p>}
            {showSuggestions && suggestions.length > 0 && (
                <SearchSuggestions suggestions={suggestions} onSelect={handleSelect} />
            )}
        </div>
    );
};

export default SearchBar;