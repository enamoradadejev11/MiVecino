import React from "react";

const MapContext = React.createContext({
  isMapReady: false,
  map: {},
  setMap: () => {},
  isAddressMapReady: false,
  addressMap: {},
  setAddressMap: () => {},
});

export default MapContext;
