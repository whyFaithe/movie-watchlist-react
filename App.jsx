import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import WatchlistPage from "./WatchlistPage";
import { WatchlistProvider } from "./WatchlistContext";

export default function App() {
    return (
        <WatchlistProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/watchlist" element={<WatchlistPage />} />
                </Routes>
            </Router>
        </WatchlistProvider>
    );
}
