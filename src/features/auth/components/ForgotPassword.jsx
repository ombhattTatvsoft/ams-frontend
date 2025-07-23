import React, { useMemo } from "react";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import { useSelector } from "react-redux";
import { forgotPassword } from "../authSlice";
import Loader from "../../../common/components/ui/Loader";
import { forgotPasswordSchema } from "../authSchema";
import UpsertForm from "../../../common/components/ui/UpsertForm";
import { createButton, createInputField, createLink } from "../../../common/utils/formFieldGenerator";

function ForgotPassword() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const formFields = useMemo(() => [
    createInputField({name:"email",label:"Email",type:"email"}),
    createLink({name:"backToLogin",to:PUBLIC_ROUTES.LOGIN,label:"Back to login",containerClassName:"col-6"}),
    createButton({name:"sendButton",type:"submit",containerClassName:"col-6 d-flex justify-content-end mb-1",className:"sitebgcolor",label:"Send"})
  ],[]);

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {loading && <Loader />}
      <h3 className="mb-4">Forgot Password</h3>
      <div className="col-10 mb-3">
        <p className="text-muted">
          Enter you email and we'll send you a link to reset your password.
        </p>
        <UpsertForm
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          saveAction={forgotPassword}
          fields={formFields}
          showFooter={false}
        >
        </UpsertForm>
      </div>
    </>
  );
}

export default ForgotPassword;
