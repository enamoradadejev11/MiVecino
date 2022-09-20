import { makeStyles } from "@material-ui/core/styles";

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
