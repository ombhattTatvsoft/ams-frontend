import React from "react";
import { departmentSchema } from "../departmentSchema";
import { getDepartments, saveDepartment } from "../departmentSlice";
import UpsertForm from "../../../common/components/ui/UpsertForm";
import { useDispatch } from "react-redux";
import { createInputField } from "../../../common/utils/formFieldGenerator";

const DepartmentUpsertForm = ({
  editData,
  goBack,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <UpsertForm
        goBack={goBack}
        initialValues={{
          departmentId: editData?.departmentId || 0,
          departmentName: editData?.departmentName || "",
        }}
        validationSchema={departmentSchema}
        saveAction={saveDepartment}
        onSuccess={() => {
          goBack();
          dispatch(getDepartments());
        }}
        fields={[
          createInputField({name: "departmentName", label: "Name"}),
        ]}
        confirmButtonText={!editData ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
};

export default DepartmentUpsertForm;
