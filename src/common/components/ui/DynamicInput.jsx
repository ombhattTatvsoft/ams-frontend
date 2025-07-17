import React from "react";
import { useField } from "formik";
import FormInput from "./FormInput";
import FormSelect from './FormSelect';
import FormCheckBox from './FormCheckBox';
import FormDatePicker from './FormDatePicker';
import FormTextarea from './FormTextarea';

function DynamicInput({ field }) {
  const [formikField, meta] = useField(field.name);
  const error = meta.touched && meta.error;

  const commonProps = {
    value: formikField.value,
    onChange: formikField.onChange,
    label: field.label,
    id: field.name,
    name: field.name,
    error,
  };

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return <FormInput {...commonProps} type={field.type}/>;

    case "select":
      return <FormSelect {...commonProps} options={field.options || []}/>;

    case "checkbox":
      return (
        <FormCheckBox
          {...commonProps}
          checked={formikField.value || field.defaultChecked || false}
        />
      );

    case "datepicker":
      return <FormDatePicker {...commonProps}/>;

    case "textarea":
      return <FormTextarea {...commonProps} rows={field.rows}/>;

    default:
      return null;
  }
}

export default DynamicInput;