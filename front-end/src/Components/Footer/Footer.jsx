import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">Adopție Animale
            <p>&copy; 2025 Adopție Animale. Toate drepturile rezervate.</p>
                <p>
                    <a href="/privacy-policy">Politica de confidențialitate</a> | 
                    <a href="/terms"> Termeni și condiții</a>
                </p>
            </div>
            <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">About us</Link></li>
                <li><Link to="/">Pets</Link></li>
                <li><Link to="/">Locations</Link></li>
                <li><Link to="/">Contact</Link></li>
            </ul>
        </footer>
    );
};

export default Footer;
