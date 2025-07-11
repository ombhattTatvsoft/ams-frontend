import React from "react";
import NavBar from "../common/components/layout/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default MainLayout;
