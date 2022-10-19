export const getUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};

export const isSessionExpired = () => !window.localStorage.getItem("user");

export const authHeader = () => {
  const user = getUser();
  const token = `Bearer ${user.token}`;
  return { headers: { Authorization: token } };
};

export const colors = {
  MINT: "#99C1BA",
  DARK_PINK: "#F48686",
};

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert("no se pudo obtener la geolocation");
        console.log(err);
        reject();
      }
    );
  });
};
