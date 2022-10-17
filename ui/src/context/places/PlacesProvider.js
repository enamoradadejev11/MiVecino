import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../utils/utils";
import PlacesContext from "./PlacesContext";
import { placesActions, placesReducer } from "./PlacesReducer";

const INITIAL_STATE = {
  isLoading: true,
  userLocation: undefined,
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

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
