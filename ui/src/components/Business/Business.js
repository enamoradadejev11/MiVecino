import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { businessStyles } from "./businessUtils";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AddIcon from "@mui/icons-material/Add";
import Calification from "./Calification/Calification";
import { HashLink } from "react-router-hash-link";
import Information from "./Information/Information";

const Business = ({ data }) => {
  const classes = businessStyles();

  console.log("data", data);

  const [emprendimiento, setEmprendimiento] = useState({
    id: "",
    name: "",
    telephones: [{ type: "", number: "" }],
    schedule: "",
    description: "",
    categories: [],
    active: true,
    address: {
      street: "",
      outdoorNumber: "",
      interiorNumber: "",
      colony: "",
      town: "",
      state: "",
      zipCode: null,
    },
    addresses: [],
    imageUrl: "",
    score: 3,
  });

  useEffect(() => {
    if (data) {
      setEmprendimiento(data);
    }
  }, [data]);

  return (
    <>
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
                {emprendimiento.name}
              </Typography>
            </Grid>
            <Grid container direction='row'>
              <Grid item className={classes.gridContainerCal}>
                <Calification calification={emprendimiento.score} />
              </Grid>
              <Grid item>
                <Typography className={classes.information}>
                  Horario: 9:00am - 10:00pm
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={5} sm={6}>
                <div className={classes.information}>
                  {emprendimiento.description}
                </div>
              </Grid>
              <Grid item xs={5} sm={6}></Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "left", marginLeft: "40px", marginTop: "80px" }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "20px", color: "white" }}>
                  <StarIcon
                    fontSize='20'
                    sx={{ color: "white", margin: "-4px" }}
                  />{" "}
                  Calificar este lugar
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "left", marginLeft: "40px" }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "20px", color: "white" }}>
                  <AddLocationAltIcon
                    fontSize='20'
                    sx={{ color: "white", margin: "-4px" }}
                  />{" "}
                  Como llegar
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "left", marginLeft: "40px" }}
            >
              <HashLink to='#more' smooth style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: "20px", color: "white" }}>
                  <ViewCarouselIcon
                    fontSize='20'
                    sx={{ color: "white", margin: "-4px" }}
                  />{" "}
                  Mas lugares similares
                </Typography>
              </HashLink>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "left", marginLeft: "25px", marginTop: "-4px" }}
            >
              <IconButton
                aria-label='delete'
                sx={{ fontSize: 20, color: "white", borderRadius: 1 }}
              >
                <AddIcon fontSize='20' sx={{ marginRight: "0px" }} />
                Agregar a mi lista
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ textAlign: "left", marginLeft: "28px", marginTop: "-8px" }}
            >
              <Information />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Business;
