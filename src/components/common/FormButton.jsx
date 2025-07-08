import React from "react";

function FormButton({ className = "",children, disabled=false,...props}) {
  return (
    <button
      className={`btn my-2 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default FormButton;
