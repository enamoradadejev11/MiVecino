import React, { useContext, useRef } from "react";
import { Input } from "@mui/material";
import PlacesContext from "../../context/places/PlacesContext";
import SearchResults from "./SearchResults";

const ariaLabel = { "aria-label": "description" };

const SearchBar = () => {
  const { userLocation, searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef();

  const onQueryChange = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(e.target.value);
    }, 350);
  };

  return (
    <>
      {userLocation && (
        <div className='search-container'>
          <Input
            placeholder='Buscar lugar...'
            className='search-input'
            inputProps={ariaLabel}
            onChange={onQueryChange}
            sx={{ width: 280 }}
          />
          <SearchResults />
        </div>
      )}
    </>
  );
};

export default SearchBar;
