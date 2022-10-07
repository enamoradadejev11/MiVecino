import axios from "axios";
import { authHeader } from "../../utils/utils";

const emprendimientosApi = "http://localhost:8081/api/v1/emprendimiento";
const reviewApi = "http://localhost:8081/api/v1/review";

export const addNewEmprendimiento = async (emprendimiento) => {
  const response = await axios.post(
    `${emprendimientosApi}/add`,
    emprendimiento
  );
  return response.data;
};

export const updateEmprendimiento = async (emprendimiento) => {
  const response = await axios.put(
    `${emprendimientosApi}/${emprendimiento.id}/update`,
    emprendimiento,
    authHeader()
  );
  return response.data;
};

export const getUserEmprendimientos = async () => {
  const response = await axios.get(`${emprendimientosApi}/all`, authHeader());
  return response.data;
};

export const getEmprendimiento = async (id) => {
  const response = await axios.get(`${emprendimientosApi}/${id}`, authHeader());
  return response.data;
};

export const getEmprendimientoImage = async (imageUrl) => {
  const response = await axios.get(`${imageUrl}`, authHeader());
  return response.data;
};

export const addEmprendimiento = async (emprendimiento) => {
  const response = await axios.post(
    `${emprendimientosApi}/add`,
    emprendimiento,
    authHeader()
  );
  return response.data;
};

export const updateEmprendimientoImage = async (id, file) => {
  var formData = new FormData();
  formData.append("id", id);
  formData.append("emprendimientoImage", file);
  const response = await axios.put(
    `${emprendimientosApi}/update/image`,
    formData,
    authHeader()
  );
  return response.data;
};

export const getReviewEmprendimientos = async (id) => {
  const response = await axios.get(`${reviewApi}/${id}/all`, authHeader());
  return response.data;
};

export const addReview = async (emprendimientoId, review) => {
  var formData = new FormData();
  formData.append("emprendimientoId", emprendimientoId);
  formData.append("score", review.score);
  formData.append("comment", review.comment);
  formData.append("images", review.images);
  const response = await axios.post(`${reviewApi}/add`, formData, authHeader());
  return response.data;
};
