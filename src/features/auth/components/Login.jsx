import { useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import {Navigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import Loader from "../../../common/components/ui/Loader";
import { loginSchema } from "../authSchema";
import UpsertForm from './../../../common/components/ui/UpsertForm';
import { useMemo } from "react";
import { createButton, createCheckBox, createInputField, createLink } from "../../../common/utils/formFieldGenerator";


export default function Login() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  const formFields = useMemo(() => [
    createInputField({name:"email",label:"Email",type:"email"}),
    createInputField({name:"password",label:"Password",isPassword:true}),
    createCheckBox({name:"rememberme",label:"Remember me",containerClassName:"col-6 mb-3"}),
    createLink({name:"forgotPassword",to:PUBLIC_ROUTES.FORGOT_PASSWORD,label:"Forgot Password?",containerClassName:"col-6 d-flex justify-content-end"}),
    createButton({name:"loginButton",type:"submit",className:"w-100 sitebgcolor",label:"Login"})
  ],[]);

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {loading && <Loader />}
      <h3 className="mb-4">Login</h3>
      <div className="col-10 mb-3">
        <h4 className="mb-3">Welcome,</h4>
        <UpsertForm
          initialValues={{ email: "", password: "", rememberme: false }}
          validationSchema={loginSchema}
          saveAction={loginUser}
          fields={formFields}
          showFooter={false}
        >
        </UpsertForm>
      </div>
    </>
  );
}
