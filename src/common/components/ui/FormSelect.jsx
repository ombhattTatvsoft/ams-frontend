import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const FormSelect = ({
  value,
  onChange,
  label,
  id,
  error,
  name,
  options,
  handleChange,
}) => {
  return (
    <>
      <div className="mb-3"> 
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            name={name}
            value={value}
            label={label}
            onChange={(event) => {
              if (onChange) onChange(event);
              if (handleChange) handleChange(event);
            }}
          >
            {options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </div>
    </>
  );
};

export default FormSelect;
