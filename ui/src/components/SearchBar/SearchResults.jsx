import React, { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MapContext from "../../context/map/MapContext";
import PlacesContext from "../../context/places/PlacesContext";
import DirectionsIcon from "@mui/icons-material/Directions";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@material-ui/core";
import { colors } from "../../utils/utils";

const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);
  const [placeSelected, setPlaceSelected] = useState("");

  const onPlaceClicked = (place) => {
    setPlaceSelected(place.id);
    map?.flyTo({ zoom: 16, center: place.center });
  };

  const getRoute = (place) => {
    getRouteBetweenPoints(userLocation, place.center);
  };

  if (isLoadingPlaces) {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary='Buscando'
                secondary='Espere por favor...'
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    );
  }

  if (!places.length) {
    return <></>;
  }

  return (
    <nav>
      <List>
        {places.map((place) => (
          <ListItem key={place.id} disablePadding>
            <ListItemButton
              onClick={() => onPlaceClicked(place)}
              selected={placeSelected === place.id}
            >
              <div style={{ paddingRight: "1rem" }}>
                <Tooltip title='Ver ruta'>
                  <IconButton onClick={() => getRoute(place)}>
                    <DirectionsIcon style={{ color: colors.MINT }} />
                  </IconButton>
                </Tooltip>
              </div>
              <ListItemText
                primary={place.text_es}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {place.place_name}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default SearchResults;
