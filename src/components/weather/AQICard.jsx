import { useI18n } from "../../context/I18nContext.jsx";

const AQICard = ({ aqi }) => {
    const { t } = useI18n();
    const aqiLevels = [t('good'), t('fair'), t('moderate'), t('poor'), t('veryPoor')];
    const level = aqiLevels[aqi - 1] || t('unknown') || 'Unknown'; // Добавьте перевод для 'unknown', если нужно

    return (
        <div className="text-center">
            <p className="font-medium">{t('airQuality')}</p>
            <p className="font-bold text-xl">{level}</p>
            <img
                src="https://img.icons8.com/ios/50/air-quality.png"
                alt={t('airQuality')}
                className="mx-auto w-12 h-12 object-contain dark:invert"
            />
        </div>
    );
};

export default AQICard;