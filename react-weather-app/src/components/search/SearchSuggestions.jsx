import {useI18n} from "../../context/I18nContext.jsx";

const SearchSuggestions = ({ suggestions, onSelect }) => {
    const { lang } = useI18n()
    return (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border rounded shadow-lg mt-1">
            {suggestions.map((city, i) => (
                <li key={i} onClick={() => onSelect(city)} className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {city.local_names?.[lang] || city.name}, {city.country || city.state}
                </li>
            ))}
        </ul>
    );
};

export default SearchSuggestions;