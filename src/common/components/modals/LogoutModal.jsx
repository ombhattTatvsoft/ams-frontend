import React from "react";
import warningIcon from "../../assets/images/toppng.com-warning-icon-2400x2400.png";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import FormButton from "./FormButton";
import { PUBLIC_ROUTES } from "../../constants/routes";
import { Modal } from "react-bootstrap";

function LogoutModal({showModal,setShowModal}) {
    const dispatch = useDispatch();
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      aria-labelledby="logout-modal-title"
      id="logout"
    >
      <Modal.Body className="w-75 p-3 mx-auto">
        <div className="d-flex flex-column align-items-center">
          <img src={warningIcon} className="warning-icon" alt="" />
          <p className="text-body-tertiary mb-0">
            Are you sure you want to Logout?
          </p>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <FormButton
            className="sitebgcolor"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Yes
          </FormButton>
          <FormButton
            className="siteoutlinebtn"
            onClick={() => setShowModal(false)}
          >
            No
          </FormButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LogoutModal;
