import React from "react";
import { useField } from "formik";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckBox from "./FormCheckBox";
import FormDatePicker from "./FormDatePicker";
import FormTextarea from "./FormTextarea";
import FormLink from "./FormLink";
import FormButton from "./FormButton";

function DynamicInput({ field, handleChange }) {
  const [formikField, meta] = useField(field.name);
  const error = meta.touched && meta.error;

  const commonProps = {
    value: formikField.value,
    onChange: formikField.onChange,
    ...field,
    error,
  };

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return <FormInput {...commonProps} handleChange={handleChange} />;

    case "select":
      return <FormSelect {...commonProps} handleChange={handleChange} />;

    case "checkbox":
      return (
        <FormCheckBox
          {...commonProps}
          checked={formikField.value || field.defaultChecked || false}
        />
      );

    case "datepicker":
      return <FormDatePicker {...commonProps} />;

    case "textarea":
      return <FormTextarea {...commonProps} rows={field.rows} />;

    case "link":
      return <FormLink {...field} children={field.label} />;

    case "button":
    case "submit":
    case "reset":
      return <FormButton {...field} children={field.label}/>;

    default:
      return null;
  }
}

export default DynamicInput;
