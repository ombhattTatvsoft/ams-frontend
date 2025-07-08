import React from "react";

function FormCheckBox({checked=false,onChange,label}) {
  return (
    <div className="d-flex px-1">
      <input
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label ms-2" htmlFor="rememberMe">
        {label}
      </label>
    </div>
  );
}

export default FormCheckBox;
