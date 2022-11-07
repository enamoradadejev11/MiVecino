import axios from "axios";
import { authHeader, host } from "../utils/utils";

const userApi = `${host}/user`;

export const getUser = async (formValues) => {
  const response = await axios.post(`${userApi}/login`, formValues);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${userApi}/list`, authHeader());
  return response.data;
};

export const findUser = async () => {
  const response = await axios.get(`${userApi}`, authHeader());
  return response.data;
};

export const updateUser = async (formValues) => {
  const response = await axios.put(`${userApi}`, formValues, authHeader());
  return response.data;
};

export const updateUserImage = async (id, file) => {
  var formData = new FormData();
  formData.append("profileImage", file);
  const response = await axios.put(`${userApi}/image`, formData, authHeader());
  return response.data;
};

export const getIsFavorite = async (emprendimientoId) => {
  const response = await axios.get(
    `${userApi}/${emprendimientoId}/isFavorite`,
    authHeader()
  );
  return response.data;
};

export const saveFavorite = async (emprendimientoId) => {
  const response = await axios.post(
    `${userApi}/${emprendimientoId}/favorite`,
    {},
    authHeader()
  );
  return response.data;
};

export const deleteFavorite = async (emprendimientoId) => {
  const response = await axios.delete(
    `${userApi}/${emprendimientoId}/favorite`,
    authHeader()
  );
  return response.data;
};

export const getAddresses = async () => {
  const response = await axios.get(`${userApi}/addresses`, authHeader());
  return response.data;
};

export const saveAddress = async (address) => {
  const response = await axios.post(
    `${userApi}/address`,
    address,
    authHeader()
  );
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await axios.delete(`${userApi}/${id}/address`, authHeader());
  return response.data;
};

export const updateAddress = async (address) => {
  const response = await axios.put(
    `${userApi}/${address.id}/address`,
    address,
    authHeader()
  );
  return response.data;
};
