import { makeStyles } from "@material-ui/core/styles";

export const sections = {
  PROFILE: "Mi perfil",
  EMPRENDIMIENTOS: "Mis emprendimientos",
  FAVORITES: "Mis favoritos",
};

export const settingsStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  section_title: {
    color: "black",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  section_image: {
    width: 200,
  },
}));
