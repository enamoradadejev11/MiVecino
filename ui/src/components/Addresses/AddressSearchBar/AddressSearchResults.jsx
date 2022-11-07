import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MapContext from "../../../context/map/MapContext";
import PlacesContext from "../../../context/places/PlacesContext";

const AddressSearchResults = () => {
  const { addresses, isLoadingAddresses, setAddressSelected } =
    useContext(PlacesContext);
  const { addressMap } = useContext(MapContext);
  const [placeSelected, setPlaceSelected] = useState();

  const onPlaceClicked = (place) => {
    setPlaceSelected(place);
    setAddressSelected(place);
    addressMap?.flyTo({ zoom: 16, center: place.center });
  };

  if (isLoadingAddresses) {
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

  if (!addresses.length) {
    return <></>;
  }

  return (
    <nav>
      <List>
        {addresses.map((place) => (
          <ListItem key={place.id} disablePadding>
            <ListItemButton
              onClick={() => onPlaceClicked(place)}
              selected={placeSelected === place.id}
            >
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

export default AddressSearchResults;
