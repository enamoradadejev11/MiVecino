import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    language: "es",
    overview: "simplified",
    steps: false,
    access_token:
      "pk.eyJ1IjoiZW5hbW9yYWRhZGVqZXYiLCJhIjoiY2wzdjF0eGtzMHBwYTNqcDR1a2V3cHc5MiJ9.B908wvKiF6shWfLEyGI_lg",
  },
});

export default directionsApi;
