import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { loginStyles } from "./loginUtils";

const LoginForm = ({
  formErrorValues,
  formHelperTextValues,
  handleInputChange,
  handleSubmit,
}) => {
  const classes = loginStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} component={Paper} elevation={6} square>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant='h3' className={classes.title}>
            Iniciar Sesion
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin='normal'
                variant='outlined'
                fullWidth
                id='username'
                label='Nombre de usuario'
                name='username'
                autoComplete='username'
                autoFocus
                onChange={handleInputChange}
                error={formErrorValues.username}
                helperText={formHelperTextValues.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleInputChange}
                error={formErrorValues.password}
                helperText={formHelperTextValues.password}
              />
            </Grid>
            <Grid xs={12}>
              <Button
                variant='contained'
                type='submit'
                className={classes.boton}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className={classes.image} />
    </Grid>
  );
};

export default LoginForm;
