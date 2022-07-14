import { makeStyles } from "@material-ui/core";

export const defaultValues = {
  fullName: "",
  username: "",
  email: "",
  gender: "",
  birthDate: null,
};

export const defaultFormHelperTextVaues = {
  fullName: "",
  username: "",
  email: "",
  gender: "",
  birthDate: null,
};

export const defaultFormErrorVaues = {
  fullName: false,
  username: false,
  email: false,
  gender: false,
  birthDate: false,
};

export const registerGeneralParams = (
  formErrorVaues,
  formHelperTextValues,
  name
) => ({
  name,
  autoComplete: name,
  margin: "normal",
  variant: "outlined",
  fullWidth: true,
  autoFocus: true,
  required: true,
  error: formErrorVaues[name],
  helperText: formHelperTextValues[name],
});

export const registerStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://media-exp1.licdn.com/dms/image/C4D1BAQF0Gpyk2RVXnA/company-background_10000/0/1611766727320?e=2147483647&v=beta&t=MH2GOI4zEMflYR0RGDmOoHGZAUAg2KvZs2hyHep_wzU)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    padding: theme.spacing(9, 30),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(255, 34, 34, 0.60)",
    height: "100vh",
  },
  boton: {
    background: "black",
    color: "white",
    height: 40,
    width: 300,
    margin: theme.spacing(8, 0, 0, 0),
    borderRadius: 40,
    "&:hover": {
      background: "rgb(34, 34, 34, 0.80)",
    },
  },
  title: {
    color: "white",
    fontFamily: "Secular One",
    marginBottom: 40,
  },
  selectors: {
    padding: 8,
  },
  select: {
    marginTop: 16,
    marginBottom: 8,
  },
}));
