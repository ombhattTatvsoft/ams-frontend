import React from "react";

function FormInput({type='text',value,onChange,label}) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        placeholder=""
        value={value}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
}

export default FormInput;
