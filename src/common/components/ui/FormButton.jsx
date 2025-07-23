import React from "react";
import { Button } from "@mui/material";

function FormButton({ className = "", children, type, onClick, name }) {
  return (
    <Button
      name={name}
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default FormButton;