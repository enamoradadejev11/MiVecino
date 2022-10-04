import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "comida",
  "belleza",
  "natural",
  "estetica",
  "alimentos",
  "higiene",
  "evento",
  "manual",
  "salud",
  "mascotas",
];

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectCategory = ({ categories, isReadOnly }) => {
  const theme = useTheme();
  const [categoryNames, setCategoryNames] = useState(categories);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryNames(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (categories) {
      setCategoryNames(categories);
    }
  }, [categories]);

  return (
    <div>
      <FormControl sx={12} fullWidth margin={"normal"} disabled={isReadOnly}>
        <InputLabel id='demo-multiple-chip-label'>Categorias</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={categoryNames}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, categoryNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCategory;
