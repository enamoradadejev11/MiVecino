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

export const formValuesToEmprendimiento = (formValues) => {
  const { address } = formValues;
  return {
    ...formValues,
    addressId: address.id,
    longitude: address.location[0],
    latitude: address.location[1],
  };
};

export const emprendimientosTypes = [
  {
    value: "Emprendimiento",
    label: "Emprendimiento",
  },
  {
    value: "Negocio",
    label: "Negocio",
  },
  {
    value: "Servicio",
    label: "Servicio",
  },
  {
    value: "Profesionista",
    label: "Profesionista",
  },
  {
    value: "Oficio",
    label: "Oficio",
  },
];

export const giros = [
  { value: "Desayunos", label: "Desayunos" },
  { value: "Comida", label: "Comida" },
  { value: "Cena", label: "Cena" },
  { value: "Snacks", label: "Snacks" },
  { value: "Despensa", label: "Despensa" },
  { value: "Mecanica", label: "Mecanica" },
  { value: "Construction", label: "Construction" },
  { value: "Salud", label: "Salud" },
  { value: "Otros", label: "Otros" },
  { value: "Belleza", label: "Belleza" },
];

export const categoriesByGiro = {
  Desayunos: [
    { id: 1, name: "Lonches" },
    { id: 2, name: "Menudo" },
    { id: 3, name: "Tacos de barbacoa" },
    { id: 4, name: "Tacos al vapor" },
    { id: 5, name: "Tacos de canasta" },
    { id: 6, name: "Jugos" },
    { id: 7, name: "Lonches" },
    { id: 8, name: "Ensaladas" },
  ],
  Comida: [
    { id: 9, name: "Hamburguesas" },
    { id: 10, name: "Tacos" },
    { id: 11, name: "Fonda" },
    { id: 12, name: "Comida corrida" },
    { id: 13, name: "Hotdogs" },
    { id: 14, name: "Pizza" },
    { id: 1, name: "Lonches" },
  ],
  Cena: [
    { id: 15, name: "Cenaduria" },
    { id: 10, name: "Tacos" },
    { id: 17, name: "Pizza" },
    { id: 18, name: "Cafeteria" },
    { id: 19, name: "Crepas" },
    { id: 20, name: "Pozole" },
    { id: 21, name: "Tamales" },
    { id: 22, name: "Alitas" },
    { id: 23, name: "Cerveceria" },
  ],
  Snacks: [
    { id: 24, name: "Salchipulpos" },
    { id: 25, name: "Dulces" },
    { id: 26, name: "Micheladas" },
    { id: 27, name: "Churros" },
    { id: 28, name: "Bionicos" },
    { id: 29, name: "Papas a la francesa" },
    { id: 30, name: "Nieves" },
    { id: 31, name: "Banderillas" },
    { id: 32, name: "Chascas" },
    { id: 33, name: "Elotes" },
    { id: 33, name: "Pan" },
  ],
  Despensa: [
    { id: 34, name: "Abarrotes" },
    { id: 35, name: "Tiendita" },
    { id: 36, name: "Verduleria" },
    { id: 37, name: "Pescaderia" },
    { id: 38, name: "Carniceria" },
    { id: 39, name: "Mini super" },
    { id: 40, name: "Dulceria" },
  ],
  Mecanica: [
    { id: 41, name: "Mecanica" },
    { id: 42, name: "Mecanico" },
    { id: 43, name: "Transmiciones" },
    { id: 44, name: "Frenos" },
    { id: 45, name: "Refacciones" },
  ],
  Construction: [
    { id: 46, name: "Albañil" },
    { id: 47, name: "Carpintero" },
    { id: 48, name: "Herrero" },
    { id: 49, name: "Electricista" },
    { id: 50, name: "Vidriero" },
  ],
  Salud: [
    { id: 51, name: "Medico" },
    { id: 52, name: "Dermatologo" },
    { id: 53, name: "Farmacia" },
    { id: 54, name: "Pediatra" },
    { id: 55, name: "Dentista" },
    { id: 56, name: "Optica" },
  ],
  Otros: [
    { id: 57, name: "Costura" },
    { id: 58, name: "Papeleria" },
    { id: 59, name: "Ciber" },
  ],
  Belleza: [
    { id: 60, name: "Estilista" },
    { id: 61, name: "Barberia" },
    { id: 62, name: "Uñas" },
    { id: 63, name: "Peinado" },
    { id: 64, name: "Maquillaje" },
    { id: 65, name: "Depilacion" },
  ],
  non: [],
};
