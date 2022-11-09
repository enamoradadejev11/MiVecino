import { makeStyles } from "@material-ui/core";

export const sliderStyles = makeStyles((theme) => ({
  root: {},
  card: {
    backgroundColor: "rgb(34, 34, 34, 0.80)",
    color: "white",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    display: "flex !important",
    "&:hover": {
      backgroundColor: "rgb(7, 42, 64, 0.54)",
    },
  },
}));
