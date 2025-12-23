import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UnitsProvider } from "./context/UnitsContext.jsx";
import { I18nProvider } from "./context/I18nContext.jsx";
import 'dayjs/locale/en';
import 'dayjs/locale/ru';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UnitsProvider>
            <I18nProvider>
                <App />
            </I18nProvider>
        </UnitsProvider>
    </React.StrictMode>
);