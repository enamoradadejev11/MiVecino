import React from "react";
import Box from "@mui/material/Box";
import { calificationStyles } from "./calificationUtils";
import { useState } from "react";
import { useEffect } from "react";
import { Rating } from "@mui/material";

const Calification = ({ calification }) => {
  const classes = calificationStyles();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (calification) {
      setScore(calification);
    }
  }, [calification]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name='read-only'
        value={score}
        readOnly
        className={classes.gridContainerCalification}
        size='large'
      />
    </Box>
  );
};

export default Calification;
