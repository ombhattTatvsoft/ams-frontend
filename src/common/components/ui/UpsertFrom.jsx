import React from "react";
import { Formik } from "formik";
import FormButton from "../../../common/components/ui/FormButton";
import { useDispatch } from "react-redux";
import DynamicInput from "./DynamicInput";

const UpsertForm = ({
  setEditData,
  setShowUpsertModal,
  initialValues,
  validationSchema,
  saveAction,
  fetchAction,
  fields,
  confirmButtonText,
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
            setShowUpsertModal(false);
            setEditData(null);
            if (fetchAction) dispatch(fetchAction());
          }
        });
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <DynamicInput key={field.name} field={field} />
          ))}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <FormButton className="sitebgcolor mb-1" type="submit">
              {confirmButtonText}
            </FormButton>
            <FormButton
              className="siteoutlinebtn mb-1"
              onClick={() => {
                setShowUpsertModal(false);
                setEditData(null);
              }}
            >
              Cancel
            </FormButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UpsertForm;