import React from "react";
import Typography from "@material-ui/core/Typography";
import { typographyStyles } from "../../utils/stylesUtils";
import { Container, Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import { sections } from "./settingsUtils";
import SettingsSection from "./SettingsSection";

const Settings = () => {
  const typography = typographyStyles();
  const { PROFILE, EMPRENDIMIENTOS, FAVORITES } = sections;
  return (
    <>
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
    </>
  );
};

export default Settings;
