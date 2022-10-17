import { useReducer } from "react";
import { Marker } from "mapbox-gl";
import { mapActions, mapReducer } from "./MapReducer";
import MapContext from "./MapContext";
import { colors } from "../../utils/utils";

const INITIAL_STATE = {
  isMapReady: false,
  map: {},
  setMap: () => {},
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (map) => {
    new Marker({ color: colors.MINT }).setLngLat(map.getCenter()).addTo(map);
    dispatch(mapActions.setMap(map));
  };

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
