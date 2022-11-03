import { Container, Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { typographyStyles } from "../../utils/stylesUtils";
import SettingsImageUploader from "../Settings/SettingsImageUploader";
import { ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import UserProfileButton from "./userProfileButton";
import ProfileForm from "./ProfileForm";
import AddressForm from "./AddressForm";
import {
  mockAddress,
  modalStyle,
  userProfileDefaultValues,
} from "./userProfileUtils";
import { findUser, updateUserImage } from "../../services/userServices";
import ImagesSlider from "../ImagesSlider/ImagesSlider";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { getUserWithExpiry, headerAccess, theme } from "../../utils/utils";
import { useLocation } from "wouter";

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
  const [addresses] = useState(mockAddress);

  const options = {
    account: {
      label: "Mi cuenta",
      additionalText: user.username + " | " + user.email + " | " + user.gender,
      form: <ProfileForm user={user} setUser={setUser} setOpen={setOpen} />,
    },
    address: {
      label: "Mis direcciones",
      form: <AddressForm addresses={addresses} />,
      additionalText: `${addresses[0].street}, ${addresses[0].colony}, ${addresses[0].city}, ${addresses[0].state}`,
    },
  };

  useEffect(() => {
    findUser()
      .then((response) => {
        setUser(response);
      })
      .catch((e) => setOpen(false));
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
                  id='address'
                  option={options["address"]}
                  handleOpen={handleOpen}
                />
                <UserProfileButton
                  id='account'
                  option={options["account"]}
                  handleOpen={handleOpen}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <ImagesSlider
                  items={user.favorites}
                  sectionTittle='Mis favoritos'
                  type='userProfile'
                />
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
