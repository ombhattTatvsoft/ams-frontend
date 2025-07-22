import React, { useEffect } from "react";
import defaultPfp from "../../../assets/images/Default_pfp.svg.png";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, saveUser } from "../../users/userSlice";
import Loader from "./../../../common/components/ui/Loader";
import { getUserData } from "../../../utils/manageUserData";
import UpsertForm from "./../../../common/components/ui/UpsertFrom";
import { navigateTo } from "../../../common/utils/navigate";
import dayjs from "dayjs";
import { profileSchema } from "../../dashboard/dashboardSchema";

const Profile = () => {
  const localUser = getUserData();
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localUser.id));
  }, [dispatch, localUser.id]);

  return (
    <>
      {loading && <Loader />}
      {user && (
        <div className="content">
          <div className="row">
            <div>
              <h3>My Profile</h3>
            </div>
            <div>
              <div className="shadow-lg p-4 rounded-3">
                <div className="d-flex justify-content-start align-items-center gap-3 mb-3">
                  <Avatar
                    src={defaultPfp}
                    alt="Profile"
                    sx={{ width: 100, height: 100 }}
                  />
                  <div>
                    <h3 className="mt-3">{user.name}</h3>
                    <h5 className="text-muted">
                      Joining Date :
                      <span className="text-dark">
                        {" "}
                        {dayjs(user.createdAt).format("DD MMMM YYYY")}
                      </span>
                    </h5>
                  </div>
                </div>
                <UpsertForm
                  goBack={() => navigateTo(-1)}
                  initialValues={user}
                  validationSchema={profileSchema}
                  saveAction={saveUser}
                  fields={[
                    {
                      name: "name",
                      label: "Name",
                      type: "text",
                      className: "col-md-6",
                    },
                    {
                      name: "email",
                      label: "Email",
                      type: "email",
                      className: "col-md-6",
                    },
                    {
                      name: "roleName",
                      label: "Role",
                      type: "text",
                      className: "col-md-6",
                      disabled: true,
                    },
                    ...(user.managerName
                      ? [
                          {
                            name: "managerName",
                            label: "Reports to",
                            type: "text",
                            className: "col-md-6",
                            disabled: true,
                          },
                        ]
                      : []),
                    ...(user.departmentName
                      ? [
                          {
                            name: "departmentName",
                            label: "Department",
                            type: "text",
                            className: "col-md-6",
                            disabled: true,
                          },
                        ]
                      : []),
                  ]}
                  confirmButtonText={"Submit"}
                ></UpsertForm>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
