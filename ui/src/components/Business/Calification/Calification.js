import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { calificationStyles } from "./calificationUtils";

const Calification = ({ calification }) => {
  const classes = calificationStyles();
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name='read-only'
        value={calification}
        readOnly
        className={classes.gridContainerCalification}
      />
    </Box>
  );
};

export default Calification;
