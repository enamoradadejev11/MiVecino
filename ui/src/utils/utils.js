export const getUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};

export const authHeader = () => {
  const user = getUser();
  const token = `Bearer ${user.token}`;
  return { headers: { Authorization: token } };
};

export const colors = {
  MINT: "#99C1BA",
  DARK_PINK: "#F48686",
};
