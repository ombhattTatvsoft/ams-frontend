import React, { useState } from "react";
import NavBar from "../common/components/layout/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from '../common/components/layout/sideBar/SideBar';
import { Box } from "@mui/material";
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

function MainLayout() {
  const isMobile = useMediaQuery('(max-width: 991px)');
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle}></NavBar>
      <SideBar open={open} drawerWidth={drawerWidth}></SideBar>
      <Box
        component="main"
        className="p-4"
        sx={{
          marginLeft: !isMobile && open ? `${drawerWidth}px` : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default MainLayout;
