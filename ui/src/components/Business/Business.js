import { Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getUserWithExpiry } from "../../utils/utils";
import BusinessLinks from "./BusinessLinks";
import { businessStyles } from "./businessUtils";
import Calification from "./Calification/Calification";

const Business = ({ data, isFavorite, addFavorite, removeFavorite }) => {
  const classes = businessStyles();
  const [, setLocation] = useLocation();

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

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
    score: undefined,
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
            <Grid item xs={12} sm={6}>
              <Typography className={classes.title}>
                {emprendimiento.name}
              </Typography>
            </Grid>
            <Grid container direction='row'>
              <Grid item className={classes.gridContainerCal}>
                <Calification calification={emprendimiento.rating} />
              </Grid>
            </Grid>
            <Grid item xs={5} sm={6}>
              <Typography className={classes.description}>
                {emprendimiento.description}
              </Typography>
            </Grid>
            <BusinessLinks
              isFavorite={isFavorite}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Business;
