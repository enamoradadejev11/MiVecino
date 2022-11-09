import { makeStyles } from "@material-ui/core/styles";

export const defaultValues = {
  1: "Calificar este lugar",
  2: "Como llegar",
  3: "Mas lugares similares",
};

export const businessStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(0,0,50,0.5),rgba(0,0,0,5)),url(https://i.ytimg.com/vi/4KJlMeUvAYk/maxresdefault.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  gridContainetIcon: {
    textAlign: "left",
    marginLeft: "40px",
  },
  image: {
    backgroundImage:
      "url(https://i.ytimg.com/vi/4KJlMeUvAYk/maxresdefault.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    color: "white",
    paddingLeft: "60px",
    marginTop: 50,
    textAlign: "left",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 70,
  },
  description: {
    color: "white",
    fontSize: 20,
    paddingLeft: "60px",
    textAlign: "left",
    fontFamily: ['"Karla"', "sans-serif"].join(","),
  },
  iconTittle: {
    color: "white",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 20,
    paddingLeft: "10px",
    textAlign: "left",
  },
  information: {
    color: "white",
    fontSize: "20px",
    marginTop: 20,
    paddingLeft: "60px",
    textAlign: "justify",
  },
  link: {
    color: "white",
    fontSize: "60px",
    marginTop: 20,
    paddingLeft: "60px",
    textAlign: "justify",
  },
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "30px",
  },
  gridContainerTitle: {
    paddingBottom: "40px",
  },
  list: {
    color: "white",
    paddingLeft: "60px",
    textAlign: "left",
  },
  buttonIcon: {
    color: "yellow",
  },
}));
