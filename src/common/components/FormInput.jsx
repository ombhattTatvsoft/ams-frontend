import React from "react";

function FormInput({type='text',value,onChange,label,id}) {
  return (
    <div className="form-floating mb-3">
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder=""
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default FormInput;
