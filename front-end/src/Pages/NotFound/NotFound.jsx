import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";


const NotFound = () => {

  return (
    <div className="not-found">
        <h1>404 - Pagina nu a fost găsită</h1>
        <p>Ne pare rău, dar pagina pe care o cauți nu există.</p>
        <Link to="/">Go back to Home</Link>
    </div>
    );
};

export default NotFound;