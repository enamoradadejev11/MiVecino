import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@mui/material/TextField";
import { generalStyles, typographyStyles } from "../../utils/stylesUtils";
import { updateUser } from "../../services/userServices";

const categoryFields = [
  {
    label: "Test 1",
    name: "test-1",
  },
  {
    label: "Test 2",
    name: "test-2",
  },
  {
    label: "Test 3",
    name: "test-3",
  },
];

const ProfileForm = ({ user, setUser, setOpen }) => {
  const typography = typographyStyles();
  const styles = generalStyles();
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user)
      .then((response) => {
        setUser(response);
        setOpen(false);
      })
      .catch((e) => {
        setErrorMessage("Error al actualizar...");
      });
  };

  useEffect(() => {
    setGender(user.gender);
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <Typography id='modal-modal-title' className={typography.dark_title}>
        {user.username}
      </Typography>
      <Typography
        id='modal-modal-title'
        className={typography.section_title_light}
      >
        {user.email}
      </Typography>
      <Box p={2}></Box>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                className
                value={gender}
                label='Gender'
                name='gender'
                onChange={handleChange}
                size='small'
                fullWidth
              >
                <MenuItem value={"male"}>Hombre</MenuItem>
                <MenuItem value={"female"}>Mujer</MenuItem>
                <MenuItem value={"other"}>Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {categoryFields.map((field) => (
            <Grid item xs={12}>
              <TextField
                label={field.label}
                name={field.name}
                value={""}
                onChange={handleChange}
                size='small'
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
        <Box pt={5} display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            type='submit'
            className={styles.form_button}
          >
            Actualizar
          </Button>
        </Box>
        <Typography id='modal-modal-title' className={typography.text_error}>
          {errorMessage}
        </Typography>
      </form>
    
    </>
  );
};

export default ProfileForm;
