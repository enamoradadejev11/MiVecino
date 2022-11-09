import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { navbarStyles } from "./navbarUtils";

const Navbar = ({ types }) => {
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

          {types?.map((type) => (
            <Button
              variant='h6'
              color='default'
              onClick={() => setRoute(`/${type.route}`)}
            >
              {type.text}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
};

export default Navbar;
