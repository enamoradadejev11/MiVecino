import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
        Mi Vecino 
      {` ${new Date().getFullYear()}` }
      {'.'}
    </Typography>
  );
}

export const Footer = () =>{
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // position: 'absolute',
        // bottom: 0,
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 1,
          mt: 'auto',
            backgroundImage:
            "url(https://media-exp1.licdn.com/dms/image/C4D1BAQF0Gpyk2RVXnA/company-background_10000/0/1611766727320?e=2147483647&v=beta&t=MH2GOI4zEMflYR0RGDmOoHGZAUAg2KvZs2hyHep_wzU)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm" >
          <Typography variant="body1" color='white'>
            Mi Vecino App, Derechos Reservados
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}