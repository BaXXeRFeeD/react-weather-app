import { useI18n } from "../../context/I18nContext.jsx";

const EmptyState = () => {
    const { t } = useI18n();

    return (
        <div className="flex justify-center items-center h-screen">
            {t("noData")}
        </div>
    );
};

export default EmptyState;