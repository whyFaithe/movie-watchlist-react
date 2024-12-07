import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context
const WatchlistContext = createContext();

// Watchlist Provider Component
export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem("myWatchlistIDs") || "[]");
        setWatchlist(savedWatchlist);
    }, []);

    // Save watchlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("myWatchlistIDs", JSON.stringify(watchlist));
    }, [watchlist]);

    // Add a movie to the watchlist
    const addToWatchList = (imdbID) => {
        if (!watchlist.includes(imdbID)) {
            setWatchlist((prev) => [imdbID, ...prev]);
        }
    };

    // Remove a movie from the watchlist
    const removeFromWatchList = (imdbID) => {
        setWatchlist((prev) => prev.filter((id) => id !== imdbID));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchList, removeFromWatchList }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Custom Hook to use the Watchlist Context
export const useWatchlist = () => {
    return useContext(WatchlistContext);
};
