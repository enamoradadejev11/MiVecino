import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import PlacesContext from "../../context/places/PlacesContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { homePageStyles } from "../HomePage/homePageUtils";
import mapboxgl from "mapbox-gl";
import { useRef } from "react";
import MapContext from "../../context/map/MapContext";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5hbW9yYWRhZGVqZXYiLCJhIjoiY2wzdjF0eGtzMHBwYTNqcDR1a2V3cHc5MiJ9.B908wvKiF6shWfLEyGI_lg";

const MainMap = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { isMapReady, setMap } = useContext(MapContext);
  const [currentMap, setCurrentMap] = useState(null);
  const mapDiv = useRef(null);
  const styles = homePageStyles();

  useEffect(() => {
    if (currentMap && !isMapReady) {
      setMap(currentMap);
    }
  }, [currentMap, setMap, isMapReady]);

  useLayoutEffect(() => {
    if (!isLoading && !isMapReady) {
      const map = new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
      setCurrentMap(map);
    }
  }, [isLoading, isMapReady, userLocation]);

  if (isLoading) {
    return (
      <Box className={styles.loading_map}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div ref={mapDiv} className={styles.loading_map}>
      {userLocation?.join(",")}
    </div>
  );
};

export default MainMap;
