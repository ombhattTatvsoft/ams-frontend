import { Menu } from "@mui/material";
import React from "react";

const DropdownMenu = ({ id, open, anchorEl, handleClose,children}) => {
  return (
    <>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default DropdownMenu;
