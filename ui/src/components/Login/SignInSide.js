import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ff9a27",
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  boton: {
    background: "black",
    color: "white",
    height: 48,
    width: 250,
    margin: theme.spacing(8, 0, 0, 0),
  },
  title: {
    color: "white",
    fontFamily: "Secular One",
    marginBottom: 40,
  },
}));

const SignInSide = () => {
  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} className={classes.image} />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.form}>
          <Typography variant='h3' className={classes.title}>
            Registro
          </Typography>
          <Box component='form' onSubmit={() => {}}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Nombre Completo'
              name='name'
              autoComplete='name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Usuario'
              name='user'
              autoComplete='user'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Correo Electronico'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Contraseña'
              name='password'
              autoComplete='gender'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='gender'
              label='Genero'
              name='gender'
              autoComplete='gender'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='birthday'
              label='Cumpleaños'
              name='birthday'
              autoComplete='birthday'
              autoFocus
            />
            <div>
              <Button variant='contained' className={classes.boton}>
                Siguiente
              </Button>
            </div>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
