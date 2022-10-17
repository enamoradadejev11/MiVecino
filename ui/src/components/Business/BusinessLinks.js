import React from "react";
import { Grid } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { Box, Typography } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AddIcon from "@mui/icons-material/Add";
import { businessStyles } from "./businessUtils";
import Stack from "@mui/material/Stack";

const iconStyle = { color: "white", margin: "-4px", fontSize: "2.5rem" };

const links = [
  {
    name: "Calificar este lugar",
    icon: <StarIcon sx={iconStyle} />,
    link: "#review",
  },
  {
    name: "Como llegar",
    icon: <AddLocationAltIcon sx={iconStyle} />,
    link: "#location",
  },
  {
    name: "Mas lugares similares",
    icon: <ViewCarouselIcon sx={iconStyle} />,
    link: "#similarPlaces",
  },
];

const BusinessLinks = () => {
  const classes = businessStyles();
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ textAlign: "left", marginLeft: "40px", marginTop: "80px" }}
      >
        {links.map((link) => (
          <Box p={2}>
            <HashLink to={link.link} smooth style={{ textDecoration: "none" }}>
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                spacing={2}
              >
                {link.icon}
                <Typography
                  className={classes.iconTittle}
                  sx={{ fontSize: "50px", color: "white" }}
                >
                  {link.name}
                </Typography>
              </Stack>
            </HashLink>
          </Box>
        ))}
        <Box p={2}>
          <IconButton aria-label='delete' sx={{ padding: "initial" }}>
            <Stack
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              spacing={2}
            >
              <AddIcon sx={iconStyle} />
              <Typography
                className={classes.iconTittle}
                sx={{ fontSize: "50px", color: "white" }}
              >
                Agregar a mi lista
              </Typography>
            </Stack>
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

export default BusinessLinks;
