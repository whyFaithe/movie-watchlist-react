import React, { useEffect, useState } from "react";
import Header from "./Header";
import FilmBlock from "./FilmBlock";
import { useWatchlist } from "./WatchlistContext";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();  // We only need the watchlist array now
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFilmData = async () => {
    const movieData = watchlist.map((ID) =>
      fetch(`https://www.omdbapi.com/?apikey=1fc5a7d3&plot&type=movie&i=${ID}`)
        .then((res) => res.json())
        .then((data) => ({
          title: data.Title,
          poster: data.Poster.includes("http") ? data.Poster : "/images/No_image.jpg",
          plot: data.Plot,
          imdbRating: data.imdbRating,
          imdbID: data.imdbID,
          runtime: data.Runtime,
          genre: data.Genre
        }))
    );
    return Promise.all(movieData);
  };

  useEffect(() => {
    async function loadWatchlist() {
      setLoading(true);
      const films = await fetchFilmData();
      setWatchlistData(films);
      setLoading(false);
    }
    loadWatchlist();
  }, [watchlist]);

  if (loading) {
    return (
      <div className="main-page">
        <Header>Your Watchlist</Header>
        <div className="info-container content">
          <div className="result-placeholder">
            <p>Loading Your Watch List...</p>
          </div>
        </div>
      </div>
    );
  }

  if (watchlistData.length === 0) {
    return (
      <div className="main-page">
        <Header>Your Watchlist</Header>
        <div className="info-container content">
          <div className="result-placeholder">
            <p>Your watchlist is looking a little empty...</p>
            <a href="/" className="subtext">
              <i className="fa-solid fa-circle-plus"></i> Let's add some movies!
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-page">
      <Header>Your Watchlist</Header>
      <div className="info-container content">
        {watchlistData.map((film) => (
          <FilmBlock
            key={film.imdbID}
            film={film}
            watchlist={watchlist}
          />
        ))}
      </div>
    </div>
  );
}