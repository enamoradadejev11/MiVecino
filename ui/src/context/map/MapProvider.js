import { useContext, useEffect, useReducer } from "react";
import { LngLatBounds, Marker, Popup } from "mapbox-gl";
import { mapActions, mapReducer } from "./MapReducer";
import MapContext from "./MapContext";
import { colors } from "../../utils/utils";
import PlacesContext from "../places/PlacesContext";
import directionsApi from "../../services/directionsApi";

const INITIAL_STATE = {
  isMapReady: false,
  map: {},
  markers: [],
  // methods
  setMap: () => {},
};

const ROUTE_ID = "RouteString";

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places, placeSelected } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h3>${place.text_es}</h3><p>${place.place_name_es}</p>`
      );
      const newMarker = new Marker({ color: colors.ORANGE })
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state?.map);
      newMarkers.push(newMarker);
    }

    //Todo: limpiar polyline
    dispatch(mapActions.setMarkers(newMarkers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers = [];
    if (placeSelected) {
      const { latitude, longitude } = placeSelected;
      const popup = new Popup().setHTML(`<h3>${placeSelected.name}</h3>`);
      const newMarker = new Marker({ color: colors.ORANGE })
        .setPopup(popup)
        .setLngLat([longitude, latitude])
        .addTo(state?.map);
      newMarkers.push(newMarker);
    }
    dispatch(mapActions.setMarkers(newMarkers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeSelected]);

  const setMap = (map) => {
    new Marker({ color: colors.MINT }).setLngLat(map.getCenter()).addTo(map);
    dispatch(mapActions.setMap(map));
  };

  const cleanPolyline = () => {
    if (Object.keys(state.map).length && state.map.getLayer(ROUTE_ID)) {
      state.map.removeLayer(ROUTE_ID);
      state.map.removeSource(ROUTE_ID);
    }
  };

  const cleanMarkers = () => {
    state.markers.forEach((marker) => marker.remove());
    dispatch(mapActions.setMarkers([]));
  };

  const cleanMap = () => {
    cleanPolyline();
    cleanMarkers();
  };

  const getRouteBetweenPoints = async (start, end) => {
    const resp = await directionsApi.get(
      `/${start.join(",")};${end.join(",")}`
    );

    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);
    for (const coord of coords) {
      bounds.extend(coord);
    }
    state.map.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    cleanPolyline();
    state.map.addSource(ROUTE_ID, sourceData);
    state.map.addLayer({
      id: ROUTE_ID,
      type: "line",
      source: ROUTE_ID,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: { "line-color": "white", "line-width": 3 },
    });
  };

  return (
    <MapContext.Provider
      value={{ ...state, setMap, getRouteBetweenPoints, cleanMap }}
    >
      {children}
    </MapContext.Provider>
  );
};
