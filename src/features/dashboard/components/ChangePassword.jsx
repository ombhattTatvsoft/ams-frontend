import React from "react";
import { navigateTo } from "../../../common/utils/navigate";
import UpsertForm from "../../../common/components/ui/UpsertFrom";
import { changePasswordSchema } from './../dashboardSchema';
import { changePassword } from './../dashboardSlice';
import { getUserData } from "../../../utils/manageUserData";

const ChangePassword = () => {
  const user = getUserData();
  return (
    <div>
      <div className="content">
        <div className="row">
          <div>
            <h3>Change Password</h3>
          </div>
          <div className="mt-2 col-xxl-4 col-lg-6 col-md-8 ms-md-5">
          <p className="text-body-tertiary">Enter a new password to update your account credentials</p>
            <UpsertForm
              goBack={() => navigateTo(-1)}
              initialValues={{
                email:user.email,
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              }}
              validationSchema={changePasswordSchema}
              saveAction={changePassword}
              fields={[
                {
                  name: "currentPassword",
                  label: "Current Password",
                  type: "password",
                  isPassword: true,
                },
                {
                  name: "newPassword",
                  label: "New Password",
                  type: "password",
                  isPassword: true,
                },
                {
                  name: "confirmNewPassword",
                  label: "Confirm New Password",
                  type: "password",
                  isPassword: true,
                },
              ]}
              confirmButtonText={"Submit"}
            ></UpsertForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
