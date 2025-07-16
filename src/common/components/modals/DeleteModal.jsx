import React from "react";
import PopUpModal from "../ui/PopUpModal";
import warningIcon from "../../../assets/images/toppng.com-warning-icon-2400x2400.png";
import FormButton from "../ui/FormButton";

const DeleteModal = ({ showModal, setShowModal, entity ,onDelete}) => {
  const title="Delete Confirmation";
  const body = (
    <>
      <div className="d-flex flex-column align-items-center">
        <img src={warningIcon} className="warning-icon" alt="" />
        <p className="h5 mb-0">Are you sure you want to delete this {entity}?</p>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-4">
        <FormButton
          className="sitebgcolor mb-1"
          onClick={onDelete}
        >
          Yes
        </FormButton>
        <FormButton
          className="siteoutlinebtn mb-1"
          onClick={() => setShowModal(false)}
        >
          No
        </FormButton>
      </div>
    </>
  );
  return (
    <>
      <PopUpModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        body={body}
      ></PopUpModal>
    </>
  );
};

export default DeleteModal;
