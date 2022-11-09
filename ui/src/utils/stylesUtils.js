import { makeStyles } from "@material-ui/core/styles";
import { colors } from "./utils";

const { MINT, DARK_PINK } = colors;

export const typographyStyles = makeStyles((theme) => ({
  bright_title: {
    color: "white",
    fontFamily: "Secular One",
    marginBottom: 40,
  },
  dark_title: {
    color: "black",
    fontFamily: "Secular One",
    fontSize: 30,
  },
  section_title: {
    color: "black",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 16,
  },
  large_section_title: {
    color: "black",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 20,
  },
  section_title_light: {
    color: "#848484",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 16,
  },
  large_section_title_light: {
    color: "#848484",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: "40 !important",
  },
  text_error: {
    color: "#FF2222",
    fontFamily: ['"Inconsolata"', "monospace"].join(","),
    fontSize: 16,
  },
  dark_regular_text: {
    color: "black",
    fontFamily: ['"Karla"', "sans-serif"].join(","),
    fontSize: 18,
    fontWeight: "bold",
  },
  light_regular_text: {
    color: "#556577",
    fontFamily: ['"Karla"', "sans-serif"].join(","),
    fontSize: 16,
  },
}));

export const generalStyles = makeStyles((theme) => ({
  form_button: {
    backgroundColor: "rgb(34, 34, 34, 0.80)",
    color: "white",
    height: 40,
    width: 120,
    borderRadius: 10,
    marginLeft: 20,
    boxShadow: "initial",
    "&:hover": {
      background: MINT,
      boxShadow: "initial",
    },
  },
  delete_form_button: {
    backgroundColor: "rgb(34, 34, 34, 0.80)",
    color: "white",
    height: 40,
    width: 120,
    borderRadius: 10,
    marginLeft: 20,
    boxShadow: "initial",
    "&:hover": {
      background: DARK_PINK,
      boxShadow: "initial",
    },
  },
}));

export const generalFormProps = (
  formErrorVaues,
  formHelperTextValues,
  name
) => ({
  id: name,
  name,
  variant: "filled",
  autoComplete: name,
  margin: "normal",
  fullWidth: true,
  required: true,
  color: "secondary",
  size: "small",
  error: formErrorVaues[name],
  helperText: formHelperTextValues[name],
});

export const handleMandatoryFields = (
  input,
  formErrorValues,
  setFormErrorValues,
  formHelperTextValues,
  setFormHelperTextValues
) => {
  const { name, value } = input;
  if (value === "") {
    setFormErrorValues({
      ...formErrorValues,
      [name]: true,
    });
    setFormHelperTextValues({
      ...formHelperTextValues,
      [name]: "Este campo es obligatorio",
    });
  } else {
    setFormErrorValues({
      ...formErrorValues,
      [name]: false,
    });
    setFormHelperTextValues({
      ...formHelperTextValues,
      [name]: "",
    });
  }
};
