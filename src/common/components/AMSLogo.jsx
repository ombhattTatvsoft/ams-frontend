import React from "react";
import logo from "../../assets/images/AMS_logo_2.png"

function AMSLogo({height}) {
  return (
    <img src={logo} className="img-fluid" style={{ height: height }} alt="" />
  );
}

export default AMSLogo;
