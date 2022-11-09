import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "wouter";
import { typographyStyles } from "../../utils/stylesUtils";
import { getUserWithExpiry, headerAccess } from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import SettingsSection from "./SettingsSection";
import { sections } from "./settingsUtils";

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
