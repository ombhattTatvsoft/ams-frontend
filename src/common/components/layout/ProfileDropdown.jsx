import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../../constants/routes";
import {
  Avatar,
  IconButton,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUserData } from "../../../utils/manageUserData";
import LogoutModal from "../modals/LogoutModal";
import defaultPfp from "../../../assets/images/Default_pfp.svg.png";
import DropdownMenu from "./../ui/DropdownMenu";

function ProfileDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = getUserData();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ p: 0 }}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar src={defaultPfp} alt="Profile" sx={{ width: 50, height: 50 }} />
      </IconButton>
      <DropdownMenu id="profile-menu" anchorEl={anchorEl} handleClose={handleClose} open={open}>
        <MenuItem disabled>
          <Typography color="text.primary">
            {user.name} ({user.roleName})
          </Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          component={Link}
          to={PRIVATE_ROUTES.PROFILE}
          onClick={handleClose}
          sx={{ color: "text.primary" }}
        >
          <Avatar
            src={defaultPfp}
            alt="Profile"
            sx={{ width: 20, height: 20, mr: 1 }}
          />
          My Profile
        </MenuItem>
        <MenuItem
          component={Link}
          to={PRIVATE_ROUTES.CHANGE_PASSWORD}
          onClick={handleClose}
          sx={{ color: "text.primary" }}
        >
          <AutorenewIcon sx={{ width: 20, height: 20, mr: 1 }} />
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShowModal(true);
            handleClose();
          }}
          sx={{ color: "text.primary" }}
        >
          <LogoutIcon sx={{ width: 20, height: 20, mr: 1 }} />
          Logout
        </MenuItem>
      </DropdownMenu>
      <LogoutModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default ProfileDropdown;
