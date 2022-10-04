import axios from "axios";
import { authHeader } from "../utils/utils";

const userApi = "http://localhost:8081/user";

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
