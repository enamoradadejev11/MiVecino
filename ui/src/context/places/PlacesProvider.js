import { useEffect, useReducer } from "react";
import searchApi from "../../services/searchApi";
import { getUserLocation } from "../../utils/utils";
import PlacesContext from "./PlacesContext";
import { placesActions, placesReducer } from "./PlacesReducer";

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  placeSelected: null,
};

export const PlacesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.isLoading) {
      getUserLocation().then((location) =>
        dispatch(placesActions.setUserLocation(location))
      );
    }
  }, [state.isLoading]);

  const searchPlacesByTerm = async (query) => {
    if (query.length === 0) {
      dispatch(placesActions.setPlaces([]));
      return [];
    }

    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");

    dispatch(placesActions.setLoadingPlaces());
    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch(placesActions.setPlaces(resp.data.features));
    return resp.data.features;
  };

  const showPlaceSelected = (place) => {
    dispatch(placesActions.setPlaceSelected(place));
  };

  return (
    <PlacesContext.Provider
      value={{ ...state, searchPlacesByTerm, showPlaceSelected }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
