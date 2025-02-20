import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {

    const { t } = useTranslation();

    return (
        <nav className="navbar">
            <div className="navbar-brand"><Link to="/">{t('pet_adoption')}</Link></div>
            <ul className="navbar-links">
                <li><Link to="/">{t('home')}</Link></li>
                <li><Link to="/pets">{t('pets')}</Link></li>
                <li><Link to="/">{t('location')}</Link></li>
                <li><Link to="/">{t('about_us')}</Link></li>
                <li><Link to="/admin/add-animal">{t('contact')}</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
