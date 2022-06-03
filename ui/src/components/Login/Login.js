import React from "react";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

const Login = () => {
  return (
    <>
      <h1>Iniciar Sesion</h1>
      <FormControl>
        <InputLabel htmlFor='my-input'>Nombre Completo</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='my-input'>Usuario</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='my-input'>Correo Electronico</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='my-input'>Contraseña</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='my-input'>Genero</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
      </FormControl>
    </>
  );
};

Login.propTypes = {};

export default Login;
