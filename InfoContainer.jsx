import React from "react";
import FilmBlock from "./FilmBlock";

export default function InfoContainer({ loading, error, searchData, addToWatchlist, removeFromWatchlist }) {
    if (loading) {
        return (
            <div className="info-container" id="info-container">
                <div className="result-placeholder">
                    <p>Searching...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="info-container" id="info-container">
                <div className="result-placeholder">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="info-container" id="info-container">
            {searchData.map((film) => (
                <FilmBlock
                    key={film.imdbID}
                    film={film}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                />
            ))}
        </div>
    );
}

