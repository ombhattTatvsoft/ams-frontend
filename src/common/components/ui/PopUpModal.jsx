import React from "react";
import { Modal } from "react-bootstrap";

const PopUpModal = ({
  showModal,
  setShowModal,
  size = "md",
  title,
  body,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        size={size}
        dialogClassName="rounded-4"
      >
        {title && (
          <Modal.Header closeButton className="border-0">
            <Modal.Title >{title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body className="p-3">
          {typeof body === "string" ? <p>{body}</p> : body}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopUpModal;
