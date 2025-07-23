import React from "react";
import { Formik } from "formik";
import FormButton from "./FormButton";
import { useDispatch } from "react-redux";
import DynamicInput from "./DynamicInput";

const UpsertForm = ({
  goBack,
  initialValues,
  validationSchema,
  saveAction,
  fields,
  confirmButtonText,
  handleChange,
  onSuccess,
  showFooter = true,
}) => {
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(saveAction(values)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            onSuccess && onSuccess(values);
          }
        });
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            {fields.map((field) => (
              <div className={`${field.containerClassName}`} key={field.name}>
                <DynamicInput field={field} handleChange={handleChange} />
              </div>
            ))}
          </div>
          {showFooter && (
            <div className="d-flex justify-content-end gap-2">
              <FormButton className="sitebgcolor mb-1" type="submit">
                {confirmButtonText}
              </FormButton>
              <FormButton className="siteoutlinebtn mb-1" onClick={goBack}>
                Cancel
              </FormButton>
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default UpsertForm;
