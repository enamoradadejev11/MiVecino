import React from 'react'
import Typography from "@material-ui/core/Typography";

import { businessStyles } from "./businessUtils";


const Business = () => {

  const classes = businessStyles();
  return (
    <div >
      <div className={classes.image}></div>
       {/* <Typography variant='h3' className={classes.title}>
            Business
        </Typography> */}
      </div>
  )
}

export default Business