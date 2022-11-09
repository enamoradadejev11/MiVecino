import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getAddresses } from "../../services/userServices";
import { typographyStyles } from "../../utils/stylesUtils";
import { getUserWithExpiry, headerAccess } from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import SettingsImageUploader from "../Settings/SettingsImageUploader";
import EmprendimientoForm from "./EmprendimientoForm";
import EmprendimientoSelector from "./EmprendimientoSelector";
import {
  getUserEmprendimientos,
  updateEmprendimientoImage,
} from "./emprendimientosServices";
import { defaultValues } from "./emprendimientosUtils";

const UserEmprendimientos = () => {
  const typography = typographyStyles();
  const [emprendimientoSelected, setEmprendimientoSelected] =
    useState(defaultValues);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [areUpdates, setAreUpdates] = useState(false);
  const [, setLocation] = useLocation();

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

  useEffect(() => {
    if (areUpdates) {
      getUserEmprendimientos()
        .then((response) => {
          setEmprendimientos(response);
        })
        .catch((e) => {
          setEmprendimientos([]);
        });
    }
  }, [areUpdates]);

  useEffect(() => {
    getUserEmprendimientos()
      .then((response) => {
        setEmprendimientos(response);
      })
      .catch((e) => {
        setEmprendimientos([]);
      });

    getAddresses().then((response) => {
      setAddresses(response);
    });
  }, []);

  useEffect(() => {
    if (areUpdates) {
      getUserEmprendimientos()
        .then((response) => {
          setEmprendimientos(response);
        })
        .catch((e) => {
          setEmprendimientos([]);
        });
      setAreUpdates(false);
    }
  }, [areUpdates]);

  useEffect(() => {
    if (emprendimientoSelected) {
      if (emprendimientoSelected.id === "") {
        setIsReadOnly(false);
      } else {
        setIsReadOnly(true);
      }
    }
  }, [emprendimientoSelected]);

  return (
    <>
      <Navbar types={[headerAccess.HOME, headerAccess.SETTINGS]} />
      <Box p={10}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box pb={3}>
                <Typography className={typography.dark_title}>
                  Mis emprendimientos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <EmprendimientoSelector
                emprendimientos={emprendimientos}
                emprendimientoSelected={emprendimientoSelected}
                setEmprendimientoSelected={setEmprendimientoSelected}
                defaultValues={defaultValues}
              />
              {emprendimientoSelected.id !== "" && (
                <SettingsImageUploader
                  id={emprendimientoSelected.id}
                  url={emprendimientoSelected.imageUrl}
                  callToUpload={updateEmprendimientoImage}
                  isReadOnly={isReadOnly}
                  uploaderAlign='center'
                  setAreUpdates={setAreUpdates}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <EmprendimientoForm
                emprendimiento={emprendimientoSelected}
                addresses={addresses}
                isReadOnly={isReadOnly}
                setIsReadOnly={setIsReadOnly}
                setAreUpdates={setAreUpdates}
                dataRefreshed={areUpdates}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default UserEmprendimientos;
