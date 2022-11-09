import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const EmprendimientoSelector = ({
  emprendimientos,
  emprendimientoSelected,
  setEmprendimientoSelected,
  defaultValues,
  isAddressForm,
}) => {
  useEffect(() => {}, [emprendimientos]);

  return (
    <>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={8}>
          <FormControl margin='normal' fullWidth>
            <Select
              value={emprendimientoSelected}
              label='Categoria'
              name='emprendimientoSelector'
              variant='filled'
              onChange={(e) => {
                setEmprendimientoSelected(e.target.value);
              }}
              size='small'
            >
              <MenuItem value={defaultValues}>
                <em>Selecciona uno ...</em>
              </MenuItem>
              {emprendimientos.map((emprendimiento) => (
                <MenuItem value={emprendimiento}>
                  {isAddressForm ? emprendimiento.alias : emprendimiento.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

EmprendimientoSelector.propTypes = {
  isAddressForm: PropTypes.bool,
};

EmprendimientoSelector.defaultProps = {
  isAddressForm: false,
};

export default EmprendimientoSelector;
