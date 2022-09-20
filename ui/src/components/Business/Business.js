import React from 'react'
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';

import { businessStyles } from "./businessUtils";
import { CssBaseline } from '@material-ui/core';


const Business = () => {

  const classes = businessStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
    </div>
   
  )
}

export default Business