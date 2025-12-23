import dayjs from 'dayjs';
import {useI18n} from "../../context/I18nContext.jsx";

const SunCycle = ({ sunrise, sunset }) => {
    const { t } = useI18n();

    const sunriseTime = dayjs(sunrise * 1000).format('HH:mm');
    const sunsetTime = dayjs(sunset * 1000).format('HH:mm');

    return (
        <div className="flex space-x-4 mt-4">
            <div className="flex items-center">
                <img
                    src="sunrise.png"
                    alt={t('sunrise')}
                    className="w-12 h-12"
                />
                <div className="ml-2">
                    <p className="font-bold">{t('sunrise')}</p>
                    <p>{sunriseTime}</p>
                </div>
            </div>

            <div className="flex items-center">
                <img
                    src="sunset.png"
                    alt={t('sunset')}
                    className="w-12 h-12"
                />
                <div className="ml-2">
                    <p className="font-bold">{t('sunset')}</p>
                    <p>{sunsetTime}</p>
                </div>
            </div>
        </div>
    );
};

export default SunCycle;
