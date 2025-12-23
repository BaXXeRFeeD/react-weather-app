import { useState, useEffect } from 'react';

export const useFetchJson = (url, deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, deps);

    return { data, loading, error };
};