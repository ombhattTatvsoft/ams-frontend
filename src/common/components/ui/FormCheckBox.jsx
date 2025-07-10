import React from "react";

function FormCheckBox({checked=false,onChange,label,id,name}) {
  return (
    <div className="d-flex px-1">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label ms-2" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormCheckBox;
