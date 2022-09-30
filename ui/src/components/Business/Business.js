import React, { useContext, useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { Footer } from '../Common/Footer/Footer';
import { businessStyles } from './businessUtils';
import Navbar from '../Common/Navbar/Navbar';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AddIcon from '@mui/icons-material/Add';

import More from './Images/More';
import Calification from './Calification/Calification';
import { HashLink } from 'react-router-hash-link';
import Information from './Information/Information';

const Business = () => {
  let title = 'Banderillas Coreanas';
  let cal = 4;
  let info =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

  const classes = businessStyles();

  const [businessName, setBusinessName] = useState(title);
  const [rating, setRating] = useState(cal);
  const [information, setInformation] = useState(info);

  return (
    <>
      <Navbar />
      <Grid container direction='column'>
        <Grid container direction='column' className={classes.root}>
          <Grid
            container
            direction='column'
            spacing={2}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} className={classes.gridContainerTitle}>
              <Typography variant='h3' className={classes.title}>
                {businessName}
              </Typography>
            </Grid>
            <Grid container direction='row'>
              <Grid item className={classes.gridContainerCal}>
                <Calification calification={rating} />
              </Grid>
              <Grid item>
                <Typography className={classes.information}>
                  Horario: 9:00am - 10:00pm
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={5} sm={6}>
                <div className={classes.information}>{information}</div>
              </Grid>
              <Grid item xs={5} sm={6}></Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: 'left', marginLeft: '40px', marginTop: '80px' }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: '20px', color: 'white' }}>
                  <StarIcon
                    fontSize='20'
                    sx={{ color: 'white', margin: '-4px' }}
                  />{' '}
                  Calificar este lugar
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: 'left', marginLeft: '40px' }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: '20px', color: 'white' }}>
                  <AddLocationAltIcon
                    fontSize='20'
                    sx={{ color: 'white', margin: '-4px' }}
                  />{' '}
                  Como llegar
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: 'left', marginLeft: '40px' }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: '20px', color: 'white' }}>
                  <ViewCarouselIcon
                    fontSize='20'
                    sx={{ color: 'white', margin: '-4px' }}
                  />{' '}
                  Mas lugares similares
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: 'left', marginLeft: '25px', marginTop: '-4px' }}
            >
              <IconButton
                aria-label='delete'
                sx={{ fontSize: 20, color: 'white', borderRadius: 1 }}
              >
                <AddIcon fontSize='20' sx={{ marginRight: '0px' }} />
                Agregar a mi lista
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: 'left', marginLeft: '28px', marginTop: '-8px' }}
            >
              <Information />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction='column'>
          <Typography variant='h3'>OTHER SECTIONS...</Typography>
          <More></More>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Business;
