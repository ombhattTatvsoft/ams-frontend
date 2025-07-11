import React from "react";
import { TextField, FormHelperText } from "@mui/material";

function FormInput({ type = "text", value, onChange, label, id, error, name }) {
  return (
    <div className="mb-3">
      <TextField
        id={id}
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        fullWidth
        variant="outlined"
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
}

export default FormInput;