import { Box, Typography } from "@material-ui/core";
import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PlacesContext from "../../context/places/PlacesContext";
import { getAddresses } from "../../services/userServices";
import { typographyStyles } from "../../utils/stylesUtils";
import { headerAccess } from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import EmprendimientoSelector from "../Emprendimientos/EmprendimientoSelector";
import AddressMap from "../Map/AddressMap";
import AddressForm from "../UserProfile/AddressForm";
import { addressDefaultValues } from "../UserProfile/userProfileUtils";
import { convertToAddress } from "./addressesUtils";
import AddressSearchBar from "./AddressSearchBar/AddressSearchBar";

const Addresses = () => {
  const { addressSelected } = useContext(PlacesContext);
  const typography = typographyStyles();
  const [addresses, setAddresses] = useState([]);
  const [optionSelected, setOptionSelected] = useState(addressDefaultValues);
  const [currentAddress, setCurrentAddress] = useState(addressDefaultValues);

  useEffect(() => {
    getAddresses().then((resp) => setAddresses(resp));
  }, []);

  useEffect(() => {
    if (addressSelected) {
      const address = convertToAddress(addressSelected);
      setCurrentAddress(address);
    }
  }, [addressSelected]);

  useEffect(() => {
    setCurrentAddress(optionSelected);
  }, [optionSelected]);

  useEffect(() => {
    setOptionSelected(addressDefaultValues);
    setCurrentAddress(addressDefaultValues);
  }, [addresses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar types={[headerAccess.HOME, headerAccess.SETTINGS]} />
      <Box p={5} sx={{ height: "100vh" }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={typography.dark_title}>
                Mis direcciones
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <EmprendimientoSelector
                emprendimientos={addresses}
                emprendimientoSelected={optionSelected}
                setEmprendimientoSelected={setOptionSelected}
                defaultValues={addressDefaultValues}
                isAddressForm
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <AddressSearchBar />
            </Grid>
            <Grid item xs={12} md={5}>
              <AddressMap
                location={optionSelected.location}
                markers={addresses.map((address) => ({
                  center: address.location,
                  alias: address.alias,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AddressForm
                addresses={addresses}
                setAddresses={setAddresses}
                addressSelected={currentAddress}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Addresses;
