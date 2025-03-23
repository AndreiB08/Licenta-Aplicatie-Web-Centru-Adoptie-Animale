import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">{t('pet_adoption')}</Link>
            </div>
            <ul className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <li><Link to="/admin/dashboard">{t('dashboard')}</Link></li>
                        <li><Link to="/admin/pets">{t('manage_pets')}</Link></li>
                        {role === "admin" && (
  <li><Link to="/admin/staff">{t('manage_users')}</Link></li>
)}
                        <li><Link to="/admin/account">Editează cont</Link></li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}
                            >
                                {t('logout')}
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">{t('home')}</Link></li>
                        <li><Link to="/pets">{t('pets')}</Link></li>
                        <li><Link to="/location">{t('location')}</Link></li>
                        <li><Link to="/about">{t('about_us')}</Link></li>
                        <li><Link to="/contact">{t('contact')}</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
