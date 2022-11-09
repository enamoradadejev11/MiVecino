import { Box, Button, FormControlLabel, Grid } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  generalFormProps,
  handleMandatoryFields,
} from "../../utils/stylesUtils";
import MultipleSelectCategory from "./emprendimientosCategories";
import {
  addEmprendimiento,
  updateEmprendimiento,
} from "./emprendimientosServices";
import {
  defaultFormErrorValues,
  defaultFormHelperTextValues,
  defaultValues,
  emprendimientosFormStyles,
  emprendimientosTypes,
  formValuesToEmprendimiento,
  giros,
} from "./emprendimientosUtils";

const EmprendimientoForm = ({
  emprendimiento,
  addresses,
  isReadOnly,
  setIsReadOnly,
  setAreUpdates,
  dataRefreshed,
}) => {
  const styles = emprendimientosFormStyles();

  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrorValues, setFormErrorValues] = useState(
    defaultFormErrorValues
  );
  const [formHelperTextValues, setFormHelperTextValues] = useState(
    defaultFormHelperTextValues
  );
  const [buttonType, setButtonType] = useState();

  useEffect(() => {
    if (dataRefreshed) {
      setButtonType("Editar");
      setIsReadOnly(true);
    }
  }, [dataRefreshed, setButtonType, setIsReadOnly]);

  useEffect(() => {
    if (emprendimiento) {
      setFormValues(emprendimiento);
      if (emprendimiento.id === "") {
        setIsReadOnly(false);
        setButtonType("Agregar");
      } else {
        setIsReadOnly(true);
        setButtonType("Editar");
      }
    }
  }, [emprendimiento, setIsReadOnly]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (buttonType === "Editar") {
      setIsReadOnly(false);
      setButtonType("Guardar");
    } else if (buttonType === "Agregar") {
      addEmprendimiento(formValuesToEmprendimiento(formValues))
        .then((response) => {
          setButtonType("Editar");
          setIsReadOnly(true);
          setAreUpdates(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (buttonType === "Guardar") {
      updateEmprendimiento(formValuesToEmprendimiento(formValues))
        .then((response) => {
          setButtonType("Editar");
          setIsReadOnly(true);
          setAreUpdates(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "active") {
      setFormValues({
        ...formValues,
        [name]: e.target.checked,
      });
    } else if (name === "telephones") {
      setFormValues({
        ...formValues,
        [name]: [{ number: value }],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }

    handleMandatoryFields(
      e.target,
      formErrorValues,
      setFormErrorValues,
      formHelperTextValues,
      setFormHelperTextValues
    );
  };

  const handleChange = (name, e) => {
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete='off'
      ></Box>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Nombre emprendimiento'
              value={formValues.name}
              disabled={isReadOnly}
              onChange={handleInputChange}
              {...generalFormProps(
                formErrorValues,
                formHelperTextValues,
                "name"
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='outlined-select-type'
              select
              label='Tipo'
              value={formValues.type}
              onChange={(e) => handleChange("type", e)}
              variant='filled'
              margin='normal'
              size='small'
              disabled={isReadOnly}
              required
              fullWidth
            >
              {emprendimientosTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='outlined-select-type'
              label='Giro'
              value={formValues.giro}
              onChange={(e) => handleChange("giro", e)}
              variant='filled'
              margin='normal'
              size='small'
              disabled={isReadOnly}
              select
              required
              fullWidth
            >
              {giros.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Numero Telefonico'
              value={formValues?.telephones[0].number}
              disabled={isReadOnly}
              onChange={handleInputChange}
              {...generalFormProps(
                formErrorValues,
                formHelperTextValues,
                "telephones"
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Descripcion'
              value={formValues.description}
              disabled={isReadOnly}
              multiline
              rows={4}
              onChange={handleInputChange}
              {...generalFormProps(
                formErrorValues,
                formHelperTextValues,
                "description"
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='outlined-select-type'
              select
              label='Dirección'
              value={formValues.address}
              onChange={(e) => handleChange("address", e)}
              variant='filled'
              margin='normal'
              size='small'
              disabled={isReadOnly}
              required
              fullWidth
            >
              {addresses.map((address) => (
                <MenuItem key={address.id} value={address}>
                  {address.alias}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectCategory
              categories={formValues.categories}
              setCategories={(e) => handleChange("categories", e)}
              isReadOnly={isReadOnly}
              giro={formValues.giro}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.active}
                  onChange={handleInputChange}
                  name='active'
                  disabled={isReadOnly}
                />
              }
              label={formValues.active ? "Activo" : "Desactivo"}
            />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        <Box pt={5} display='flex' justifyContent='flex-end'>
          <Button variant='contained' type='submit' className={styles.boton}>
            {buttonType}
          </Button>
        </Box>
      </form>
    </>
  );
};

EmprendimientoForm.propTypes = {
  emprendimiento: PropTypes.shape({}).isRequired,
};

EmprendimientoForm.defaultProps = {};

export default EmprendimientoForm;
