import { colors } from "@material-ui/core";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import mapboxgl, { Marker, Popup } from "mapbox-gl";
import PropTypes from "prop-types";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MapContext from "../../context/map/MapContext";
import PlacesContext from "../../context/places/PlacesContext";
import { homePageStyles } from "../HomePage/homePageUtils";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5hbW9yYWRhZGVqZXYiLCJhIjoiY2wzdjF0eGtzMHBwYTNqcDR1a2V3cHc5MiJ9.B908wvKiF6shWfLEyGI_lg";

const AddressMap = ({ location, markers }) => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { isAddressMapReady, setAddressMap } = useContext(MapContext);
  const [currentMap, setCurrentMap] = useState(null);
  const [center, setCenter] = useState();
  const mapDiv = useRef(null);
  const styles = homePageStyles();

  useEffect(() => {
    if (currentMap && !isAddressMapReady) {
      setAddressMap(currentMap);
    }
  }, [currentMap, setAddressMap, isAddressMapReady]);

  useEffect(() => {
    if (location) {
      setCenter(location);
    } else if (userLocation) {
      setCenter(userLocation);
    }
  }, [location, userLocation]);

  useEffect(() => {
    if (currentMap && markers) {
      markers.map((marker) =>
        new Marker({ color: colors.MINT })
          .setPopup(new Popup().setHTML(`<h3>${marker.alias}</h3>`))
          .setLngLat(marker.center)
          .addTo(currentMap)
      );
    }
  }, [markers, currentMap]);

  useEffect(() => {
    if (center && Object.keys(currentMap).length) {
      currentMap?.flyTo({ zoom: 16, center });
    }
  }, [center, currentMap]);

  useLayoutEffect(() => {
    if (!isLoading && !isAddressMapReady) {
      const map = new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 16, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
      new Marker({ color: colors.MINT }).setLngLat(userLocation).addTo(map);
      setCurrentMap(map);
    }
  }, [isLoading, isAddressMapReady, userLocation]);

  if (isLoading) {
    return (
      <Box className={styles.addresses_map}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div ref={mapDiv} className={styles.addresses_map}>
      {userLocation?.join(",")}
    </div>
  );
};

AddressMap.propTypes = {
  type: PropTypes.bool,
  location: PropTypes.array,
  markers: PropTypes.array,
};

AddressMap.defaultProps = {
  isHomepage: false,
  location: null,
  markers: [],
};

export default AddressMap;
