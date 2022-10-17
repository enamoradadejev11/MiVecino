import React from "react";
import { PlacesProvider } from "./context";

const Map = () => {
  return (
    <PlacesProvider>
      <h1>Hola Mundo</h1>
    </PlacesProvider>
  );
};

export default Map;
