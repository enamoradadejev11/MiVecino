import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";

function Copyright() {
  return (
    <Typography variant='body2' color='white'>
      {"Copyright © "}
      Mi Vecino
      {` ${new Date().getFullYear()}`}
      {"."}
    </Typography>
  );
}

const styles = {
  py: 3,
  px: 1,
  mt: "auto",
  backgroundImage:
    "url(https://media-exp1.licdn.com/dms/image/C4D1BAQF0Gpyk2RVXnA/company-background_10000/0/1611766727320?e=2147483647&v=beta&t=MH2GOI4zEMflYR0RGDmOoHGZAUAg2KvZs2hyHep_wzU)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const fixedStyles = {
  left: 0,
  position: "fixed",
  bottom: 0,
  width: "100%",
};

const Footer = ({ fixed }) => {
  const calculateStyle = () =>
    fixed ? Object.assign(styles, fixedStyles) : styles;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CssBaseline />
      <Box component='footer' sx={calculateStyle()}>
        <Container maxWidth='sm'>
          <Typography variant='body1' color='white'>
            Mi Vecino App, Derechos Reservados
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

Footer.propTypes = {
  fixed: PropTypes.bool,
};

Footer.defaultProps = {
  fixed: false,
};

export default Footer;
