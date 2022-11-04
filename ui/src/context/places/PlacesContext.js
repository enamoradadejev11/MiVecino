import React from "react";

const PlacesContext = React.createContext({
  isLoading: true,
  userLocation: undefined,
  places: [],
  placeSelected: null,
  isLoadingPlaces: false,

  // methods
  searchPlacesByTerm: null,
  showPlaceSelected: null,
});

export default PlacesContext;
