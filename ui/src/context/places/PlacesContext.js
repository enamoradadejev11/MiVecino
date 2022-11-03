import React from "react";

const PlacesContext = React.createContext({
  isLoading: true,
  userLocation: undefined,
  places: [],
  isLoadingPlaces: false,

  // methods
  searchPlacesByTerm: null,
});

export default PlacesContext;
