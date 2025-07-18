import React, { useEffect, useState } from "react";
import UpsertForm from "../../../common/components/ui/UpsertFrom";
import { getRoles, getUsers } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../department/departmentSlice";
import { ROLES } from "../../../constants/roles";
import { userSchema } from './../userSchema';

const UserUpsertForm = ({ editData, setEditData, setShowUpsertModal }) => {
  const { departments } = useSelector((state) => state.department);
  const { roles, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userId: editData?.userId || 0,
    name: editData?.name || "",
    email: editData?.email || "",
    departmentId: editData?.departmentId || "",
    roleId: editData?.roleId || "",
    managerId: editData?.managerId || "",
  });

  useEffect(() => {
    if (departments.length === 0) {
      dispatch(getDepartments());
    }
    if (roles.length === 0) {
      dispatch(getRoles());
    }
  }, [dispatch, departments.length, roles.length]);

  const deptOptions = departments.map((dept) => ({
    value: dept.departmentId,
    label: dept.departmentName,
  }));

  const roleOptions = roles
    .filter((r) => r.roleName !== ROLES.ADMIN)
    .map((r) => ({
      value: r.roleId,
      label: r.roleName,
    }));

  const managerOptions = users
    .filter(
      (u) =>
        u.departmentId === formData.departmentId &&
        u.roleId < formData.roleId &&
        u.userId !== formData.userId
    )
    .map((u) => ({
      value: u.userId,
      label: u.name + " (" + u.roleName + ")",
    }));

  return (
    <>
      <UpsertForm
        setEditData={setEditData}
        setShowUpsertModal={setShowUpsertModal}
        initialValues={formData}
        handleChange={(e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        }}
        validationSchema={userSchema}
        // saveAction={saveDepartment}
        fetchAction={getUsers}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          {
            name: "departmentId",
            label: "Department",
            type: "select",
            options: deptOptions || [],
          },
          {
            name: "roleId",
            label: "Role",
            type: "select",
            options: roleOptions || [],
          },
          ...(formData.roleId !== 2 ? [{
            name: "managerId",
            label: "Reports to",
            type: "select",
            options: managerOptions || [],
          }] : []),
        ]}
        confirmButtonText={!editData ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
};

export default UserUpsertForm;
