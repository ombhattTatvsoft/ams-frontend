import React from "react";
import Link from "@mui/material/Link";

const FormLink = ({ name, to, children }) => {
  return (
    <Link href={to} underline="hover" name={name}>
      {children}
    </Link>
  );
};

export default FormLink;
