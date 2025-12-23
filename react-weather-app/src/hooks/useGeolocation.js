import { useState, useEffect } from 'react';

export const useGeolocation = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => setPosition(pos.coords),
                err => setError(err.message)
            );
        } else {
            setError('Geolocation not supported');
        }
    }, []);
    return { position, error };
};