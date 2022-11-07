import { makeStyles } from "@material-ui/core";
import { colors } from "../../utils/utils";

export const emprendimientosFormStyles = makeStyles((theme) => ({
  root: {},
  input: { color: "red" },
  color: "red",
  boton: {
    backgroundColor: "rgb(34, 34, 34, 0.80)",
    color: "white",
    height: 40,
    width: 120,
    borderRadius: 10,
    marginLeft: 20,
    boxShadow: "initial",
    "&:hover": {
      background: colors.MINT,
      boxShadow: "initial",
    },
  },
}));

export const defaultFormHelperTextValues = {
  name: "",
  telephones: [],
  schedule: "",
  description: "",
  categories: [],
};

export const defaultFormErrorValues = {
  name: false,
  telephones: false,
  schedule: false,
  description: false,
  categories: [],
};

export const defaultValues = {
  id: "",
  name: "",
  telephones: [{ type: "", number: "" }],
  schedule: "",
  description: "",
  categories: [],
  active: true,
  address: null,
  latitude: 0,
  longitude: 0,
  imageUrl: "",
};

export const byteArrayToBase64 = (byteArray) => {
  var binary_string = window.atob(byteArray);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};
