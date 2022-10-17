import React from "react";

const MapContext = React.createContext({
  isMapReady: false,
  map: {},
  setMap: () => {},
});

export default MapContext;
