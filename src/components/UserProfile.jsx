import React, { useState } from "react";
import defaultPfp from "../assets/images/Default_pfp.svg.png";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../constants/routes";
import { Dropdown } from "react-bootstrap";
import { getUserData } from "../utils/manageUserData";
import LogoutModal from "./LogoutModal";

function UserProfile() {

  const [showModal, setShowModal] = useState(false);
  const user = getUserData();

  return (
    <>
      <Dropdown className="rounded-circle">
        <Dropdown.Toggle
          as="img"
          src={defaultPfp}
          className="img-fluid rounded-circle"
          id="dropdownMenuButton1"
          style={{ height: "50px", width: "50px", cursor: "pointer" }}
          alt="Profile"
        />

        <Dropdown.Menu className="dropdown-menu-end mt-2" align="end">
          <Dropdown.Item disabled>
            <span className="text-dark">
              {user.name} ({user.role})
            </span>
          </Dropdown.Item>
          <hr className="my-1" />
          <Dropdown.Item
            as={Link}
            to={PRIVATE_ROUTES.PROFILE}
            className="links text-dark"
          >
            <img
              src={defaultPfp}
              alt=""
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
            />
            <span className="ms-2">My Profile</span>
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={PRIVATE_ROUTES.CHANGE_PASSWORD}
            className="links text-dark"
          >
            <i className="fa-solid fa-spinner" style={{ width: "20px" }}></i>
            <span className="ms-2">Change Password</span>
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => setShowModal(true)}
            className="links text-dark"
          >
            <i
              className="fa-solid fa-right-from-bracket"
              style={{ width: "20px" }}
            ></i>
            <span className="ms-2">Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    <LogoutModal showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
}

export default UserProfile;
