import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { businessStyles } from "./businessUtils";
import { Typography } from "@material-ui/core";
import Calification from "./Calification/Calification";
import BusinessLinks from "./BusinessLinks";

const Business = ({ data }) => {
  const classes = businessStyles();

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
            <Grid item xs={12} sm={6}>
              <Typography className={classes.title}>
                {emprendimiento.name}
              </Typography>
            </Grid>
            <Grid container direction='row'>
              <Grid item className={classes.gridContainerCal}>
                <Calification calification={emprendimiento.score} />
              </Grid>
            </Grid>
            <Grid item xs={5} sm={6}>
              <Typography className={classes.description}>
                {emprendimiento.description}
              </Typography>
            </Grid>
            <BusinessLinks />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Business;
