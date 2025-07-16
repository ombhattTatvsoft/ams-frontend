import React from "react";
import PopUpModal from "../ui/PopUpModal";

const UpsertModal = ({ showModal, setShowModal,title,body }) => {
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

export default UpsertModal;
