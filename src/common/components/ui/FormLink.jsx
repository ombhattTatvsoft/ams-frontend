import React from "react";
import Link from "@mui/material/Link";

const FormLink = ({ to, children }) => {
  return (
    <Link href={to} underline="hover">
      {children}
    </Link>
  );
};

export default FormLink;
