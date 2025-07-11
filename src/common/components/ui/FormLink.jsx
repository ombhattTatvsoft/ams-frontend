import React from "react";
import Link from "@mui/material/Link";

const FormLink = ({ to, children }) => {
  return (
    <Link href={to} underline="hover" sx={{marginBottom:"1rem"}}>
      {children}
    </Link>
  );
};

export default FormLink;
