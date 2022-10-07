import React from "react";
import { navbarStyles } from "./navbarUtils";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ type }) => {
  const classes = navbarStyles();
  let navigate = useNavigate();

  const setRoute = (path) => {
    navigate(path);
  };
  return (
    <div>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <div className={classes.sx}>
            <Button variant='h6' color='default' onClick={() => setRoute(`/`)}>
              <MeetingRoomIcon />
            </Button>
            <Typography variant='h6'>Mi Vecino App</Typography>
          </div>
          <Button
            variant='h6'
            color='default'
            onClick={() => setRoute(`/${type}`)}
          >
            {type}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
};

export default Navbar;
