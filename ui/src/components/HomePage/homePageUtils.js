import { makeStyles } from "@material-ui/core/styles";

export const homePageStyles = makeStyles((theme) => ({
  loading_map: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  location_map: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
}));
