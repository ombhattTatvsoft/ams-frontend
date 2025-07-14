import React from "react";
import warningIcon from "../../../assets/images/toppng.com-warning-icon-2400x2400.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import FormButton from "../ui/FormButton";
import PopUpModal from "../ui/PopUpModal";

function LogoutModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const body = (
    <>
      <div className="d-flex flex-column align-items-center">
        <img src={warningIcon} className="warning-icon" alt="" />
        <p className="h5 mb-0">Are you sure you want to Logout?</p>
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
    </>
  );
  return (
    <PopUpModal
      showModal={showModal}
      setShowModal={setShowModal}
      size="md"
      body={body}
    ></PopUpModal>
  );
}

export default LogoutModal;
