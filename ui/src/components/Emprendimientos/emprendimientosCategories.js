import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { categoriesByGiro } from "./emprendimientosUtils";

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

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectCategory = ({
  categories,
  setCategories,
  isReadOnly,
  giro,
}) => {
  const theme = useTheme();
  return (
    <div>
      <FormControl sx={12} fullWidth margin={"normal"} disabled={isReadOnly}>
        <InputLabel id='demo-multiple-chip-label'>Categorias</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={categories}
          onChange={setCategories}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {giro === "non" && <h5>Selecciona un giro para ver categorias</h5>}
          {categoriesByGiro[giro].map((category) => (
            <MenuItem
              key={category.id}
              value={category}
              style={getStyles(category.name, categories, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

MultipleSelectCategory.propTypes = {
  giro: PropTypes.string,
};

MultipleSelectCategory.defaultProps = {
  giro: "non",
};

export default MultipleSelectCategory;
