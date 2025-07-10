import React from "react";
import FormInput from "../../common/components/FormInput";
import FormButton from "../../common/components/FormButton";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../authSlice";
import { Link } from "react-router-dom";
import Loader from "../../common/components/Loader";
import { Formik } from "formik";
import { forgotPasswordSchema } from "../authSchema";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {loading && <Loader />}
      <h4 className="mb-4">Forgot Password</h4>
      <div className="col-10 mb-4">
        <p className="text-muted">
          Enter you email and we'll send you a link to reset your password.
        </p>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => dispatch(forgotPassword(values))}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                value={values.email}
                name="email"
                onChange={handleChange}
                label="Email"
                error={touched.email && errors.email}
              ></FormInput>
              <div className="d-flex justify-content-between align-items-center">
                <Link to={PUBLIC_ROUTES.LOGIN} className="links">
                  Back to login
                </Link>
                <FormButton className="sitebgcolor" type="submit">
                  {loading ? "Sending..." : "Send"}
                </FormButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ForgotPassword;
