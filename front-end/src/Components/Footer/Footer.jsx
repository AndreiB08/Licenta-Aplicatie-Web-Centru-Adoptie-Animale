import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-content">{t('pet_adoption')}
            <p>&copy; 2025 Adopție Animale. {t('rights_reserved')}</p>
                <p>
                    <a href="/privacy-policy">{t('privacy_policy')}</a> | 
                    <a href="/terms"> {t('terms')}</a>
                </p>
            </div>
            <ul className="footer-links">
                <li><Link to="/">{t('home')}</Link></li>
                <li><Link to="/pets">{t('pets')}</Link></li>
                <li><Link to="/">{t('location')}</Link></li>
                <li><Link to="/">{t('about_us')}</Link></li>
                <li><Link to="/admin/add-animal">{t('contact')}</Link></li>
            </ul>
        </footer>
    );
};

export default Footer;
