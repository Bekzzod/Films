import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        type="text"
        placeholder="Film name..."
        value={searchValue}
        onChange={handleSearchInputChange}
      />
      <input type="submit" onClick={callSearchFunction} value="Search" />
    </form>
  );
};

export default Search;
