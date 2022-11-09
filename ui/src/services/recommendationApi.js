import axios from "axios";
import { getUserWithExpiry } from "../utils/utils";

export const recommendationsApi = window.location.href.includes("localhost")
  ? "http://127.0.0.1:8000/api/ml"
  : "https://mi-vecino-ml.herokuapp.com/api/ml";

export const getRecommendations = async () => {
  const user = getUserWithExpiry();
  const response = await axios.get(`${recommendationsApi}/getRecommendations`, {
    params: {
      user_id: user?.userId,
    },
  });
  return response.data;
};
