export const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = `Bearer ${user.token}`;
  return { headers: { Authorization: token } };
};
