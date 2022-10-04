import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { generalStyles, typographyStyles } from "../../utils/stylesUtils";
import { addressDefaultValues, addressForm } from "./userProfileUtils";
import ButtonGroup from "@mui/material/ButtonGroup";

const AddressForm = ({ addresses }) => {
  const typography = typographyStyles();
  const styles = generalStyles();

  const [addressSelected, setAddressSelected] = useState(addressDefaultValues);
  const [errorMessage] = useState("");
  const [buttonType, setButtonType] = useState("Agregar");
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddressSelected({
      ...addressSelected,
      [name]: value,
    });
  };

  const isStored = useCallback(() => {
    addresses.find((address) => address.alias === addressSelected.alias);
  }, [addresses, addressSelected]);

  useEffect(() => {
    if (!isStored()) {
      setButtonType("Agregar");
      setShowDeleteButton(false);
    } else {
      setButtonType("Actualizar");
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
      <form onSubmit={() => {}}>
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Opcion:</InputLabel>
              <Select
                value={addressSelected}
                label='Address'
                name='addressSelected'
                onChange={(e) => {
                  setAddressSelected(e.target.value);
                }}
                size='small'
                fullWidth
              >
                <MenuItem value={addressDefaultValues}>
                  <em>Selecciona uno ...</em>
                </MenuItem>
                {addresses.map((a) => (
                  <MenuItem value={a}>{a.alias}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {addressForm.map((field) => (
            <Grid item xs={field.gridSize}>
              <TextField
                label={field.label}
                name={field.name}
                value={addressSelected[field.name]}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size='small'
                required
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
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
              <Button className={styles.delete_form_button}>Delete</Button>
            )}
            <Button className={styles.form_button} type='submit'>
              {buttonType}
            </Button>
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
