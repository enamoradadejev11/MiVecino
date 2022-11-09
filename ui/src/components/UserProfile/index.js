import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  findUser,
  getAddresses,
  updateUserImage,
} from "../../services/userServices";
import { typographyStyles } from "../../utils/stylesUtils";
import { getUserWithExpiry, headerAccess, theme } from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import ImagesSlider from "../ImagesSlider/ImagesSlider";
import SettingsImageUploader from "../Settings/SettingsImageUploader";
import ProfileForm from "./ProfileForm";
import UserProfileButton from "./userProfileButton";
import { modalStyle, userProfileDefaultValues } from "./userProfileUtils";

const UserProfile = () => {
  const typography = typographyStyles();

  const [open, setOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const handleOpen = (id) => {
    setOptionSelected(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [, setLocation] = useLocation();

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

  const [user, setUser] = useState(userProfileDefaultValues);
  const [addresses, setAddresses] = useState([]);

  const options = {
    account: {
      label: "Mi cuenta",
      additionalText: user.username + " | " + user.email + " | " + user.gender,
      form: <ProfileForm user={user} setUser={setUser} setOpen={setOpen} />,
    },
    address: {
      label: "Mis direcciones",
      additionalText: `${addresses}`,
    },
  };

  useEffect(() => {
    findUser()
      .then((response) => {
        setUser(response);
      })
      .catch((e) => setOpen(false));

    getAddresses().then((response) => {
      setAddresses(response);
    });
  }, [setOpen]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar types={[headerAccess.HOME, headerAccess.SETTINGS]} />
        <Box p={10}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box pb={3}>
                  <Typography className={typography.dark_title}>
                    Mi perfil
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <SettingsImageUploader
                  id={34}
                  url={user.profileImageUrl}
                  isReadOnly={false}
                  uploaderAlign={"flex-end"}
                  callToUpload={updateUserImage}
                  setResponse={() => {}}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserProfileButton
                  id='account'
                  option={options["account"]}
                  handleOpen={handleOpen}
                />
                {user.favorites.length ? (
                  <ImagesSlider
                    items={user.favorites}
                    sectionTittle='Mis favoritos'
                    type='userProfile'
                  />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={modalStyle}>{options[optionSelected]?.form}</Box>
        </Modal>
      </ThemeProvider>
      <Footer fixed />
    </>
  );
};

export default UserProfile;
