import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Adopție Animale</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">About us</Link></li>
                <li><Link to="/">Pets</Link></li>
                <li><Link to="/">Locations</Link></li>
                <li><Link to="/">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
