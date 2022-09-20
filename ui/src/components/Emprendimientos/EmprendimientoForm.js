import { Box, Button, FormControlLabel } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  generalFormProps,
  handleMandatoryFields,
} from "../../utils/stylesUtils";
import {
  defaultValues,
  defaultFormErrorValues,
  defaultFormHelperTextValues,
  emprendimientosFormStyles,
} from "./emprendimientosUtils";
import MenuItem from "@mui/material/MenuItem";
import MultipleSelectCategory from "./emprendimientosCategories";
import TextField from "@mui/material/TextField";
import { updateEmprendimiento } from "./emprendimientosServices";

const emprendimientosTypes = [
  {
    value: "Emprendimiento",
    label: "Emprendimiento",
  },
  {
    value: "Negocio",
    label: "Negocio",
  },
  {
    value: "Servicio",
    label: "Servicio",
  },
  {
    value: "Profesionista",
    label: "Profesionista",
  },
  {
    value: "Oficio",
    label: "Oficio",
  },
];

const EmprendimientoForm = ({
  emprendimiento,
  isReadOnly,
  setIsReadOnly,
  setAreUpdates,
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
  const [emprendimientoType, setEmprendimientoType] = useState("Oficio");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (buttonType === "Editar") {
      setIsReadOnly(false);
      setButtonType("Guardar");
    } else if (buttonType === "Agregar") {
      console.log("POST", formValues);
    } else if (buttonType === "Guardar") {
      updateEmprendimiento(formValues)
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

  useEffect(() => {
    if (emprendimiento) {
      setFormValues(emprendimiento);
      setEmprendimientoType(emprendimiento.type);
      if (emprendimiento.id === "") {
        setIsReadOnly(false);
        setButtonType("Agregar");
      } else {
        setIsReadOnly(true);
        setButtonType("Editar");
      }
    }
  }, [emprendimiento, setIsReadOnly]);

  const handleChange = (event) => {
    setEmprendimientoType(event.target.value);
    setFormValues({
      ...formValues,
      type: event.target.value,
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
              value={emprendimientoType}
              onChange={handleChange}
              variant='filled'
              margin='normal'
              size='small'
              disabled={isReadOnly}
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
            <MultipleSelectCategory
              categories={formValues.categories.map(
                (category) => category.name
              )}
              isReadOnly={isReadOnly}
            />
          </Grid>
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
