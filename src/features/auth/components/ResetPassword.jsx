import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import { resetPassword } from "../authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../common/components/ui/Loader";
import { toast } from "react-toastify";
import authApi from "../authApi";
import { resetPasswordSchema } from "../authSchema";
import { createButton, createInputField } from "../../../common/utils/formFieldGenerator";
import UpsertForm from "../../../common/components/ui/UpsertForm";

function ResetPassword() {
  const { resetcode } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const validateResetCode = async () => {
      try {
        const response = await authApi.getResetPassword(resetcode);
        if (response.isSuccess) {
          setIsValid(true);
        } else {
          navigate(PUBLIC_ROUTES.LOGIN);
        }
      } catch (error) {
        toast.error(error.message);
        navigate(PUBLIC_ROUTES.LOGIN);
      }
    };
    validateResetCode();
  }, [navigate, resetcode]);

  const formFields = useMemo(() => [
      createInputField({name:"newPassword",label:"New Password",isPassword:true}),
      createInputField({name:"confirmPassword",label:"Confirm New Password",isPassword:true}),
      createButton({name:"sendButton",type:"submit",className:"w-100 sitebgcolor",label:"Send"})
    ],[]);
  

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {!isValid && <Loader />}
      <h3 className="mb-4">Reset Password</h3>
      <div className="col-10 mb-3">
        <UpsertForm
          initialValues={{
            resetCode: resetcode,
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={resetPasswordSchema}
          saveAction={resetPassword}
          fields={formFields}
          showFooter={false}
        ></UpsertForm>
      </div>
    </>
  );
}

export default ResetPassword;
