import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export const businessStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage:"url(https://i.ytimg.com/vi/4KJlMeUvAYk/maxresdefault.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  image: {
    backgroundImage:
      "url(https://i.ytimg.com/vi/4KJlMeUvAYk/maxresdefault.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    color: "blue",
    fontFamily: "Secular One",
    marginBottom: 40,
  },
}))