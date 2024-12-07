import React, { useState } from "react";
import InfoContainer from "./InfoContainer";
import { useWatchlist } from "./WatchlistContext";

export default function SearchAndInfo() {
    const { watchlist, addToWatchList, removeFromWatchList } = useWatchlist();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchInput = e.target["search-input"].value;

        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=1fc5a7d3&plot&type=movie&s=${searchInput}`
            );
            const data = await res.json();

            if (data.Response === "True") {
                const IDArray = data.Search.map((movie) => movie.imdbID);
                const films = await fetchFilmData(IDArray);
                setSearchData(films);
            } else {
                setError("No results found. Try a different search.");
                setSearchData([]);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchFilmData = async (IDArray) => {
        const movieData = IDArray.map((ID) =>
            fetch(`https://www.omdbapi.com/?apikey=1fc5a7d3&plot&type=movie&i=${ID}`)
                .then((res) => res.json())
                .then((data) => ({
                    title: data.Title,
                    poster: data.Poster.includes("http") ? data.Poster : "/images/No_image.jpg",
                    plot: data.Plot,
                    imdbRating: data.imdbRating,
                    imdbID: data.imdbID,
                    runtime: data.Runtime,
                    genre: data.Genre,
                    isAdded: watchlist.includes(data.imdbID), // Check if already in watchlist
                }))
        );
        return Promise.all(movieData);
    };

    return (
        <div className="search-info content">
            <form onSubmit={handleSearch} className="search-bar" id="search-bar">
                <i className="fa fa-search"></i>
                <input
                    type="text"
                    id="search-input"
                    name="search-input"
                    placeholder="Search Title Here"
                />
                <button type="submit" id="search-btn">
                    Search
                </button>
            </form>

            <InfoContainer
                loading={loading}
                error={error}
                searchData={searchData}
                addToWatchlist={addToWatchList}
                removeFromWatchlist={removeFromWatchList}
            />
        </div>
    );
}

