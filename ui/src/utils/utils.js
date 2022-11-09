import { createTheme } from "@mui/material/styles";

const USER_KEY = "user";
export const HOME_PAGE_TYPE = "homepage";
export const APPROVALS_ROUTE = "/approvals";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#85BAB2",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

export const host = window.location.href.includes("localhost")
  ? "http://localhost:5003"
  : "http://ec2-3-89-225-92.compute-1.amazonaws.com:5003";

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY));
};

export const getUserWithExpiry = () => {
  const user = window.localStorage.getItem(USER_KEY);
  if (user) {
    const item = JSON.parse(user);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return item.value;
  }
  return null;
};

export const hasAdminRole = () => {
  const user = window.localStorage.getItem(USER_KEY);
  if (user) {
    const item = JSON.parse(user);
    return item.value.role === "ROLE_ADMIN";
  }
  return false;
};

export const setUserWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const authHeader = () => {
  const user = getUser().value;
  const token = `Bearer ${user.token}`;
  return { headers: { Authorization: token } };
};

export const colors = {
  MINT: "#99C1BA",
  DARK_PINK: "#F48686",
  ORANGE: "#FDAB4E",
};

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        //alert("no se pudo obtener la geolocation");
        //console.log(err);
        reject();
      }
    );
  });
};

export const headerAccess = {
  SETTINGS: {
    route: "settings",
    text: "Settings",
  },
  HOME: {
    route: "",
    text: "Home",
  },
  LOGIN: { route: "login", text: "Login" },
  REGISTRO: { route: "registro", text: "Registro" },
};
