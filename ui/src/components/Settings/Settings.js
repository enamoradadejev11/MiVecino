import React from "react";
import Typography from "@material-ui/core/Typography";
import { typographyStyles } from "../../utils/stylesUtils";
import { Container, Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import { sections } from "./settingsUtils";
import SettingsSection from "./SettingsSection";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { getUserWithExpiry, headerAccess } from "../../utils/utils";
import { useLocation } from "wouter";

const Settings = () => {
  const typography = typographyStyles();
  const { PROFILE, EMPRENDIMIENTOS, FAVORITES } = sections;
  const [, setLocation] = useLocation();

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

  return (
    <>
      <Navbar types={[headerAccess.HOME]} />
      <Box p={10}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box pb={3}>
                <Typography className={typography.dark_title}>
                  Preferencias
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <SettingsSection title={PROFILE} />
            </Grid>
            <Grid item xs={4}>
              <SettingsSection title={EMPRENDIMIENTOS} />
            </Grid>
            <Grid item xs={4}>
              <SettingsSection title={FAVORITES} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer fixed />
    </>
  );
};

export default Settings;
