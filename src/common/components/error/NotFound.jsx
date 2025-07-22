import React from "react";
import FormButton from "../ui/FormButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <p className="h2 mb-4 text-danger">Page Not Found</p>
      <FormButton
        className="mb-3 sitebgcolor"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </FormButton>
    </div>
  );
};

export default NotFound;
