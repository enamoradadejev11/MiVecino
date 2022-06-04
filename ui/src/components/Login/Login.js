import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    paddingTop: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#B3DED7",
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
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} component={Paper} elevation={6} square>
        <form className={classes.form} noValidate>
          <Typography variant='h3' className={classes.title}>
            Iniciar Sesion
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin='normal'
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Correo Electronico'
                name='email'
                autoComplete='email'
                autoFocus
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
              />
            </Grid>
            <Grid xs={12}>
              <Button variant='contained' className={classes.boton}>
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

export default Login;
