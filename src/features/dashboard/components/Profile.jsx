import React, { useEffect } from "react";
import defaultPfp from "../../../assets/images/Default_pfp.svg.png";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, saveUser } from "../../users/userSlice";
import Loader from "./../../../common/components/ui/Loader";
import { getUserData, setUserData } from "../../../utils/manageUserData";
import UpsertForm from "./../../../common/components/ui/UpsertForm";
import { navigateTo } from "../../../common/utils/navigate";
import dayjs from "dayjs";
import { profileSchema } from "../../dashboard/dashboardSchema";
import { createInputField } from "../../../common/utils/formFieldGenerator";

const Profile = () => {
  const localUser = getUserData();
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(localUser.userId));
  }, [dispatch, localUser.userId]);
    
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
                  onSuccess={(values) => {
                    setUserData(JSON.stringify(values));
                  }}
                  initialValues={user}
                  validationSchema={profileSchema}
                  saveAction={saveUser}
                  fields={[
                    createInputField({name:"name",label: "Name",containerClassName: "col-md-6"}),
                    createInputField({name:"email",label: "Email",type:"email",containerClassName: "col-md-6"}),
                    createInputField({name:"roleName",label: "Role",disabled:true,containerClassName: "col-md-6"}),
                    ...(user.managerName
                      ? [
                          createInputField({name:"managerName",label: "Reports to",disabled:true,containerClassName: "col-md-6"}),
                        ]
                      : []),
                    ...(user.departmentName
                      ? [
                          createInputField({name:"departmentName",label: "Department",disabled:true,containerClassName: "col-md-6"}),                        ]
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
