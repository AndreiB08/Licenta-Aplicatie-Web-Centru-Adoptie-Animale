import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {

    const { t } = useTranslation();  


  return (
    <div className="not-found">
        <h1>404 - {t('not_found')}</h1>
        <p>{t('does_not_exist')}</p>
        <Link to="/">{t('back_home')}</Link>
    </div>
    );
};

export default NotFound;