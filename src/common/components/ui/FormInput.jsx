import React, { useState } from "react";
import { TextField, FormHelperText } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function FormInput({
  name,
  label,
  type = "text",
  isPassword = false,
  disabled = false,
  value,
  onChange,
  error,
  handleChange,
  className="",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  type = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3">
      <TextField
        className={className}
        disabled={disabled}
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={(event) => {
          if (onChange) onChange(event);
          if (handleChange) handleChange(event);
        }}
        error={!!error}
        fullWidth
        variant="outlined"
        slotProps={{
          input: {
            endAdornment:
              isPassword === true ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
}

export default FormInput;
