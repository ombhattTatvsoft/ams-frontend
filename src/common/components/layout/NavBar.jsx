import React from "react";
import AMSLogo from "../ui/AMSLogo";
import ProfileDropdown from "../layout/ProfileDropdown";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar({handleDrawerToggle}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <a className="navbar-brand links">
              <div className="d-flex align-items-center gap-1">
                <AMSLogo height="40px" />
                AMS
              </div>
            </a>
            <div className="links">
              <MenuIcon sx={{ color: "white" }} onClick={handleDrawerToggle}/>
            </div>
          </div>
          <ProfileDropdown />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
