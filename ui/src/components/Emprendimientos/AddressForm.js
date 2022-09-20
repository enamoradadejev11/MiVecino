import React from "react";
import Typography from "@material-ui/core/Typography";
import { generalFormProps, typographyStyles } from "../../utils/stylesUtils";
import { Grid, TextField } from "@material-ui/core";

const AddressForm = ({
  address,
  isReadOnly,
  handleInputChange,
  formErrorValues,
  formHelperTextValues,
}) => {
  const typography = typographyStyles();
  return (
    <>
      <Grid item xs={12}>
        <Typography>Direccion:</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label='Calle'
          value={address.street}
          disabled={isReadOnly}
          onChange={handleInputChange}
          {...generalFormProps(formErrorValues, formHelperTextValues, "street")}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label='Numero Exterior'
          value={address.outdoorNumber}
          disabled={isReadOnly}
          onChange={handleInputChange}
          {...generalFormProps(
            formErrorValues,
            formHelperTextValues,
            "outdoorNumber"
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label='Numero interior'
          value={address.interiorNumber}
          disabled={isReadOnly}
          onChange={handleInputChange}
          {...generalFormProps(
            formErrorValues,
            formHelperTextValues,
            "interiorNumber"
          )}
        />
      </Grid>
    </>
  );
};

export default AddressForm;
