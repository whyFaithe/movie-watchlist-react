import React, { useEffect } from "react";
import particlesConfig from "./particles.js"; // Ensure the path matches your project structure
import { Link, useLocation } from "react-router-dom";

export default function Header({children}) {
    const location = useLocation(); // Get the current location

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS("particles-js", particlesConfig);
        } else {
            console.error("particles.js is not loaded.");
        }
    }, []);

    // Determine which button to show based on the current path
    const isSearchPage = location.pathname === "/";

    return (
        <div className="header">
            <div id="particles-js"></div>
            <div className="header-container">
                <h1>{children}</h1>
                {isSearchPage ? (
                    <Link to="/watchlist" id="watch-link">
                        <i className="fa-solid fa-bookmark"></i> My Watchlist
                    </Link>
                ) : (
                    <Link to="/" id="watch-link">
                        <i className="fa-solid fa-search"></i> Search Page
                    </Link>
                )}
            </div>
        </div>
    );
}
