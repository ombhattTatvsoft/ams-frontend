import React from "react";

function FormInput({ type = "text", value, onChange, label, id, error,name }) {
  return (
    <>
      <div className="form-floating mb-3">
        <input
          id={id}
          name={name}
          type={type}
          className="form-control"
          placeholder=""
          value={value}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <p className="text-danger">{error}</p>
    </>
  );
}

export default FormInput;
