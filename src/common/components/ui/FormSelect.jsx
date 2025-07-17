import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const FormSelect = ({ value, onChange, label, id, error, name, options }) => {
  return (
    <>
      <FormControl fullWidth sx={{ marginBottom: "1rem" }} error={!!error}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default FormSelect;
