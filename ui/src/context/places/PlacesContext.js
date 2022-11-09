import React from "react";

const PlacesContext = React.createContext({
  isLoading: true,
  userLocation: undefined,
  places: [],
  placeSelected: null,
  isLoadingPlaces: false,
  address: undefined,
  isLoadingAddress: true,
  addresses: [],
  addressSelected: null,
  isLoadingAddresses: false,

  // methods
  searchPlacesByTerm: null,
  showPlaceSelected: null,
});

export default PlacesContext;
