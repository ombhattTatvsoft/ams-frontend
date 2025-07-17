import React from "react";
import UpsertForm from "../../../common/components/ui/UpsertFrom";
import { getUsers } from "../userSlice";

const UserUpsertForm = ({ editData, setEditData, setShowUpsertModal }) => {
  return (
    <>
      <UpsertForm
        setEditData={setEditData}
        setShowUpsertModal={setShowUpsertModal}
        initialValues={{
          userId: editData?.userId || 0,
          name: editData?.name || "",
          email: editData?.email || "",
          departmentId: editData?.departmentId || 0,
          roleId: editData?.roleId || 0,
          managerId: editData?.managerId || 0,
        }}
        // validationSchema={departmentSchema}
        // saveAction={saveDepartment}
        fetchAction={getUsers}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "departmentId", label: "Department", type: "select", options: editData?.departments || [] },
          { name: "roleId", label: "Role", type: "select", options: editData?.roles || [] },
          { name: "managerId", label: "Reports to", type: "select", options: editData?.managers || [] },
        ]}
        confirmButtonText={!editData ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
};

export default UserUpsertForm;
