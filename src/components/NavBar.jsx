import React from "react";
import AMSLogo from "./AMSLogo";
import UserProfile from "./UserProfile";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <a className="navbar-brand links">
            <div className="d-flex align-items-center gap-1">
              <AMSLogo height="40px"/>
              AMS
            </div>
          </a>
          {/* <i
            className="bi bi-list fs-4"
            style={{ color: "white" }}
            onclick="toggleSidebar()"
          ></i> */}
        </div>
        <UserProfile/>
      </div>
    </nav>
  );
}

export default NavBar;
