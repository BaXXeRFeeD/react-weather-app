import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const localValue = window.localStorage.getItem(key);
        return localValue ? JSON.parse(localValue) : initialValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
                setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue]);

    return [value, setValue];
};