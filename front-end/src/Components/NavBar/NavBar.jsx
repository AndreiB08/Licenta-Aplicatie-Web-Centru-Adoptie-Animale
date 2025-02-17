import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Adoptie Animale</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
