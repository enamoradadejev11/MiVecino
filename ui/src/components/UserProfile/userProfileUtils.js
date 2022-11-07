import { makeStyles } from "@material-ui/core/styles";

export const userProfileStyles = makeStyles((theme) => ({
  textField: {
    border: "1px solid red",
    borderRadius: theme.shape.borderRadius,
  },
}));

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const userProfileDefaultValues = {
  username: "",
  email: "",
  gender: "",
  favorites: [],
};

export const addressDefaultValues = {
  alias: "",
  street: "",
  extNumber: "",
  colony: "",
  state: "",
  country: "",
  zipCode: "",
  reference: "",
  city: "",
  telephone: "",
  location: null,
};

export const mockAddress = [
  {
    id: 1,
    name: "Casa tia",
    alias: "Casa tia",
    street: "Juan de ovalle",
    number: 234,
    colony: "Revolucion",
    state: "Jalisco",
    country: "Mexico",
    zipCode: "33124",
    reference: "Junto al comex",
    city: "Guadalajara",
    telephone: "3376454567",
    location: [-103.36606247624928, 20.667530177840987],
  },
  {
    id: 2,
    name: "Mi ksita",
    alias: "Mi ksita",
    street: "Adolfo Lopez Mateos mz 55 lt 23a",
    number: 29,
    colony: "Valle de Anahiac",
    state: "Estado de Mexico",
    country: "Mexico",
    zipCode: "55210",
    reference: "Entre Sor Juana y Leona Vicario",
    city: "Ecatepect de Morelogs",
    telephone: "3321653434",
    location: [-103.36495764453535, 20.675381919144126],
  },
];

export const addressForm = [
  {
    gridSize: 12,
    label: "Alias",
    name: "alias",
  },
  {
    gridSize: 8,
    label: "Calle",
    name: "street",
  },
  {
    gridSize: 4,
    label: "Numero ext",
    name: "extNumber",
  },
  {
    gridSize: 12,
    label: "Colonia",
    name: "colony",
  },
  {
    gridSize: 6,
    label: "Estado",
    name: "state",
  },
  {
    gridSize: 6,
    label: "Pais",
    name: "country",
  },
  {
    gridSize: 6,
    label: "CP",
    name: "zipCode",
  },
  {
    gridSize: 6,
    label: "Telefono",
    name: "telephone",
  },
  {
    gridSize: 12,
    label: "Referencia",
    name: "reference",
  },
];
