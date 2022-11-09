import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    country: "mx",
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiZW5hbW9yYWRhZGVqZXYiLCJhIjoiY2wzdjF0eGtzMHBwYTNqcDR1a2V3cHc5MiJ9.B908wvKiF6shWfLEyGI_lg",
  },
});

export default searchApi;
