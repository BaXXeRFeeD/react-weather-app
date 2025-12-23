import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UnitsContext = createContext();

export const UnitsProvider = ({ children }) => {
    const [units, setUnits] = useLocalStorage('units', 'metric');
    return (
        <UnitsContext.Provider value={{ units, setUnits }}>
            {children}
        </UnitsContext.Provider>
    );
};

export const useUnits = () => useContext(UnitsContext);