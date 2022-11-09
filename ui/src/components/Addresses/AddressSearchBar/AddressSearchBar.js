import { Box, Input } from "@mui/material";
import React, { useContext, useRef } from "react";
import PlacesContext from "../../../context/places/PlacesContext";
import AddressSearchResults from "./AddressSearchResults";

const ariaLabel = { "aria-label": "description" };

const AddressSearchBar = () => {
  const { searchAddressesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef();

  const onQueryChange = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchAddressesByTerm(e.target.value);
    }, 350);
  };

  return (
    <>
      <Box sx={{ textAlign: "left", paddingBottom: 2 }}>
        Para agregar una direccion, buscala aqui:
      </Box>
      <div className='address-search-container'>
        <Input
          placeholder='Buscar direccion...'
          className='address-search-input'
          inputProps={ariaLabel}
          onChange={onQueryChange}
          sx={{ width: 280 }}
        />
        <AddressSearchResults />
      </div>
    </>
  );
};

export default AddressSearchBar;
