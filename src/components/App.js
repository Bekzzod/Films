import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=south&apikey=126d5163";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue, page) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setTotalResults(jsonResponse.totalResults);
          setMaxPages( totalResults % 10 ? totalResults/10 : (totalResults/10) +1 )
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const handleSearchInputChange = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    setPage(1);
    search(searchValue, page);
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
    console.log(page)
    search(searchValue, page);
  }

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
    console.log(page)
    search(searchValue, page);
  }

  return (
    <div className="App">
      <Header text="Films" />
      <form className="search">
        <input
          type="text"
          placeholder="Film name..."
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <input type="submit" onClick={callSearchFunction} value="Search" />
      </form>
      <p className="App-intro">Results: </p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
      {page > 1 && page < maxPages ? (
        <div className="pages">
          <div onClick={handlePrevPage}>&lt;</div>
          <div onClick={handleNextPage}>&gt;</div>
        </div>
      ) : page === maxPages ? (
        <div className="pages">
          <div onClick={handlePrevPage}>&lt;</div>
        </div>
      ) : (
        <div className="pages">
          <div onClick={handleNextPage}>&gt;</div>
        </div>
      )}
    </div>
  );
};

export default App;
