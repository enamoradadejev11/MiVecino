import { Box, Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { deleteAddress, saveAddress } from "../../services/userServices";
import { generalStyles, typographyStyles } from "../../utils/stylesUtils";
import { colors } from "../../utils/utils";
import { addressForm } from "./userProfileUtils";

const ADD_BUTTON_TYPE = "Agregar";
const UPDATE_BUTTON_TYPE = "Actualizar";

const AddressForm = ({
  addresses,
  setAddresses,
  addressSelected,
  handleChange,
}) => {
  const typography = typographyStyles();
  const styles = generalStyles();

  const [errorMessage] = useState("");
  const [buttonType, setButtonType] = useState(ADD_BUTTON_TYPE);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [messageError, setMessageError] = useState("");

  const isStored = useCallback(() => {
    return addresses.find((address) => address.id === addressSelected.id);
  }, [addresses, addressSelected]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (buttonType === ADD_BUTTON_TYPE) {
      saveAddress(addressSelected)
        .then((resp) => {
          setAddresses(resp);
          setMessageError("");
        })
        .catch((e) =>
          setMessageError("Error al agregar la direccion, intenta de nuevo.")
        );
    }
  };

  const handleDelete = async () => {
    deleteAddress(addressSelected.id)
      .then((resp) => {
        setAddresses(resp);
        setMessageError("");
      })
      .catch((e) =>
        setMessageError("Error al eliminar direccion, intenta de nuevo.")
      );
  };

  useEffect(() => {
    if (!isStored()) {
      setButtonType(ADD_BUTTON_TYPE);
      setShowDeleteButton(false);
    } else {
      setButtonType(UPDATE_BUTTON_TYPE);
      setShowDeleteButton(true);
    }
  }, [addressSelected, isStored]);

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-start'
        spacing={0}
      >
        <Typography id='modal-modal-title' className={typography.dark_title}>
          {addressSelected.alias}
        </Typography>
      </Stack>

      <Box p={2}></Box>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          {addressForm.map((field) => (
            <Grid item xs={field.gridSize}>
              <TextField
                label={field.label}
                name={field.name}
                value={addressSelected[field.name]}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size='small'
                disabled={isStored()}
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
        {messageError !== "" && (
          <Box p={2} sx={{ color: colors.DARK_PINK }}>
            <h3>{messageError}</h3>
          </Box>
        )}
        <Box
          pt={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            {showDeleteButton && (
              <Button
                className={styles.delete_form_button}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            )}
            {!isStored() && (
              <Button className={styles.form_button} type='submit'>
                {ADD_BUTTON_TYPE}
              </Button>
            )}
          </ButtonGroup>
        </Box>

        <Typography id='modal-modal-title' className={typography.text_error}>
          {errorMessage}
        </Typography>
      </form>
    </>
  );
};

export default AddressForm;
