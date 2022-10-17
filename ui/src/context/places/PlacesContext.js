import React from "react";

const PlacesContext = React.createContext({
  isLoading: true,
  userLocation: undefined,
});

export default PlacesContext;
