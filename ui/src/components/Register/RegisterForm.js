import { MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
import React from "react";
import { registerGeneralParams, registerStyles } from "./registerUtils";

const RegisterForm = ({
  formValues,
  formErrorVaues,
  formHelperTextValues,
  handleSubmit,
  handleInputChange,
  handleDatePickerChange,
  errorMessage,
}) => {
  const classes = registerStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} className={classes.image} />
      <Grid item xs={false} md={7} component={Paper} elevation={6} square>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant='h3' className={classes.title}>
            Registro
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Nombre Completo'
                onChange={handleInputChange}
                {...registerGeneralParams(
                  formErrorVaues,
                  formHelperTextValues,
                  "fullName"
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Usuario'
                onChange={handleInputChange}
                {...registerGeneralParams(
                  formErrorVaues,
                  formHelperTextValues,
                  "username"
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo Electronico'
                onChange={handleInputChange}
                {...registerGeneralParams(
                  formErrorVaues,
                  formHelperTextValues,
                  "email"
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                onChange={handleInputChange}
                type='password'
                {...registerGeneralParams(
                  formErrorVaues,
                  formHelperTextValues,
                  "password"
                )}
              />
            </Grid>
            <Grid xs={12} sm={6} className={classes.selectors}>
              <FormControl className={classes.select} fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  className={classes.select}
                  value={formValues.gender}
                  label='Gender'
                  name='gender'
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value={"male"}>Hombre</MenuItem>
                  <MenuItem value={"female"}>Mujer</MenuItem>
                  <MenuItem value={"other"}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} className={classes.selectors}>
              <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                <DatePicker
                  label='Cumpleaños'
                  name='birthDate'
                  value={formValues.birthDate}
                  onChange={handleDatePickerChange}
                  renderInput={(params) => (
                    <TextField
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      required
                      {...params}
                      error={formErrorVaues.birthDate}
                      helperText={formHelperTextValues.birthDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12}>{errorMessage}</Grid>
            <Grid xs={12}>
              <Button
                variant='contained'
                type='submit'
                className={classes.boton}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  errorMessage: PropTypes.bool,
};

RegisterForm.defaultProps = {
  errorMessage: "",
};

export default RegisterForm;
