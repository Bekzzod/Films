import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://scannain.com/media/no-poster-1.jpg";

const trimTitle = string => {
  const maxLength = 28;
  return string.length > maxLength
    ? string.substring(0, maxLength - 3) + "..."
    : string;
};

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <div>
        <img
          width="200px"
          height="300px"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <h4>{trimTitle(movie.Title)}</h4>
      <p>{movie.Year}</p>
    </div>
  );
};

export default Movie;
