import React, { useLayoutEffect, useState, useRef } from "react";
import { homePageStyles } from "../HomePage/homePageUtils";
import mapboxgl from "mapbox-gl";
import { Typography } from "@material-ui/core";
import { typographyStyles } from "../../utils/stylesUtils";
import { Box } from "@mui/material";
import { Marker } from "mapbox-gl";
import BtnLocationRestore from "./BtnLocationRestore";
import { colors } from "../../utils/utils";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZW5hbW9yYWRhZGVqZXYiLCJhIjoiY2wzdjF0eGtzMHBwYTNqcDR1a2V3cHc5MiJ9.B908wvKiF6shWfLEyGI_lg";

const EmprendimientoMap = ({ location }) => {
  const [map, setMap] = useState();
  const typography = typographyStyles();
  const mapDiv = useRef(null);
  const styles = homePageStyles();

  useLayoutEffect(() => {
    const currentMap = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: location,
      zoom: 16,
      projection: "globe",
    });
    new Marker({ color: colors.MINT })
      .setLngLat(currentMap.getCenter())
      .addTo(currentMap);
    setMap(currentMap);
  }, [location, setMap]);

  return (
    <div id='location'>
      <Typography className={typography.dark_title}>
        Encuentranos aqui...
      </Typography>
      <Box pt={5} pb={5}>
        <BtnLocationRestore location={location} map={map} />
        <div ref={mapDiv} className={styles.location_map}>
          {location?.join(",")}
        </div>
      </Box>
    </div>
  );
};

export default EmprendimientoMap;
