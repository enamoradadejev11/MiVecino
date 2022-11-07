import { makeStyles } from "@material-ui/core/styles";

export const homePageStyles = makeStyles((theme) => ({
  home_page_map: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "700px",
  },
  location_map: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
  addresses_map: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
}));
