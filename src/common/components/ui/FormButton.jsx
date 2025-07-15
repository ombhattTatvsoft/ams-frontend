import React from "react";
import { Button } from "@mui/material";

function FormButton({ className = "", children, disabled = false, ...props }) {
  return (
    <Button
      className={`${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}

export default FormButton;