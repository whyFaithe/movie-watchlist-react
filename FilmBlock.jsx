// FilmBlock.js
import React from "react";
import { useWatchlist } from "./WatchlistContext";

export default function FilmBlock({ film }) {  
  const { watchlist, addToWatchList, removeFromWatchList } = useWatchlist();
  const isInWatchlist = watchlist?.includes(film.imdbID) || false;
  
  return (
    <div className="film-block">
      <img
        src={film.poster}
        alt={film.title}
        style={{ width: "140px", height: "100%", objectFit: "fill" }}
      />
      <div>
        <div className="film-block-row film-block-title">
          <h3>{film.title}</h3>
          <div className="rating-block">
            IMDB Rating:
            <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
            <p>{film.imdbRating}</p>
          </div>
        </div>
        <div className="film-block-row info-block">
          <p>{film.runtime}</p>
          <p>{film.genre}</p>
          <button 
            onClick={() => removeFromWatchList(film.imdbID)}
            className={`remove-btn ${!isInWatchlist ? 'hidden' : ''}`}
          >
            <i className="fa-solid fa-circle-minus"></i>
            Remove
          </button>
          <button 
            onClick={() => addToWatchList(film.imdbID)}
            className={`add-btn ${isInWatchlist ? 'hidden' : ''}`}
          >
            <i className="fa-solid fa-circle-plus"></i>
            Watchlist
          </button>
        </div>
        <div className="film-block-row">
          <p>{film.plot}</p>
        </div>
      </div>
    </div>
  );
}