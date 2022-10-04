import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Grid } from "@mui/material";
import React from "react";
import { defaultValues } from "./emprendimientosUtils";

const EmprendimientoSelector = ({
  emprendimientos,
  emprendimientoSelected,
  setEmprendimientoSelected,
}) => {
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
                  {emprendimiento.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default EmprendimientoSelector;
