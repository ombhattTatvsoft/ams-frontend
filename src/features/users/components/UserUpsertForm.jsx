import React, { useEffect, useMemo, useState } from "react";
import UpsertForm from "../../../common/components/ui/UpsertFrom";
import { getRoles, getUsers, saveUser } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../department/departmentSlice";
import { ROLES } from "../../../constants/roles";
import { userSchema } from "./../userSchema";

const UserUpsertForm = ({ editData, goBack }) => {
  const { departments } = useSelector((state) => state.department);
  const { roles, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userId: editData?.userId || 0,
    name: editData?.name || "",
    email: editData?.email || "",
    departmentId: editData?.departmentId || 0,
    roleId: editData?.roleId || 0,
    managerId: editData?.managerId || 0,
  });

  useEffect(() => {
    if (departments.length === 0) {
      dispatch(getDepartments());
    }
    if (roles.length === 0) {
      dispatch(getRoles());
    }
  }, [dispatch, departments.length, roles.length]);

  const deptOptions = useMemo(() => {
    return [
      { value: 0, label: "Select Department" },
      ...departments.map((dept) => ({
        value: dept.departmentId,
        label: dept.departmentName,
      })),
    ];
  }, [departments]);

  const roleOptions = useMemo(() => {
    return [
      { value: 0, label: "Select Role" },
      ...roles
        .filter((r) => r.roleName !== ROLES.ADMIN)
        .map((r) => ({
          value: r.roleId,
          label: r.roleName,
        })),
    ];
  }, [roles]);

  const managerOptions = useMemo(() => {
    const options = [
      { value: 0, label: "Select Reporting Person" },
      ...users
        .filter(
          (u) =>
            u.departmentId === formData.departmentId &&
            u.roleId < formData.roleId &&
            u.userId !== formData.userId
        )
        .map((u) => ({
          value: u.userId,
          label: u.name + " (" + u.roleName + ")",
        })),
    ];
    options.some((option) => option.value === editData?.managerId)
      ? setFormData({ ...formData, managerId: editData?.managerId })
      : setFormData({ ...formData, managerId: 0 });
    return options;
  }, [users, formData.departmentId, formData.roleId, formData.userId]);

  const formFields = useMemo(
    () => [
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
      ...(formData.roleId !== 2
        ? [
            {
              name: "managerId",
              label: "Reports to",
              type: "select",
              options: managerOptions || [],
            },
          ]
        : []),
    ],
    [deptOptions, formData.roleId, managerOptions, roleOptions]
  );

  return (
    <>
      <UpsertForm
        goBack={goBack}
        initialValues={formData}
        handleChange={(e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        }}
        validationSchema={userSchema}
        saveAction={saveUser}
        onSuccess={() => {
          goBack();
          dispatch(getUsers());
        }}
        fields={formFields}
        confirmButtonText={!editData ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
};

export default UserUpsertForm;
