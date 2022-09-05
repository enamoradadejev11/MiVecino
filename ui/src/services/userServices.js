import axios from "axios";

const userApi = "http://localhost:8081/user";

const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = `Bearer ${user.token}`;
  console.log("token", token);
  return { headers: { Authorization: token } };
};

export const getUser = async (formValues) => {
  const response = await axios.post(`${userApi}/login`, formValues);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${userApi}/list`, authHeader());
  return response.data;
};
