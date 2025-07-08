import React from "react";
import { Outlet } from "react-router-dom";
import AMSLogo from "../components/AMSLogo";

function AuthLayout() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="d-flex col-xxl-4 col-xl-6 col-md-8 col-11 flex-column align-items-center justify-content-center card border-3 bg-white rounded-4">
        <div className="d-flex align-items-center gap-1 my-4 bg-dark text-white rounded-3 p-1">
          <AMSLogo height="60px"/>
          <span className="me-3 h3 mb-0">AMS</span>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default AuthLayout;
