import React from "react";
import { TextField, FormHelperText } from "@mui/material";

function FormTextarea({ value, onChange, label, id, name, rows = 4, error}) {
  return (
    <div className="mb-3">
      <TextField
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        multiline
        rows={rows}
        fullWidth
        variant="outlined"
        error={!!error}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
}

export default FormTextarea;