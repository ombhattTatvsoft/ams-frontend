import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import FormInput from "../../common/components/FormInput";
import FormButton from "../../common/components/FormButton";
import { resetPassword } from "../authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../common/components/Loader";
import { toast } from "react-toastify";
import authApi from "../authApi";
import { Formik } from "formik";
import { resetPasswordSchema } from "../authSchema";

function ResetPassword() {
  const { resetcode } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);
  const dispatch = useDispatch();
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

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {!isValid && <Loader />}
      <h4 className="mb-4">Reset Password</h4>
      <div className="col-10 mb-4">
        <Formik
          initialValues={{
            resetCode: resetcode,
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={resetPasswordSchema}
          onSubmit={(values) => dispatch(resetPassword(values))}
        >
          {({ values, errors, handleSubmit, handleChange, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                label="New Password"
                name='newPassword'
                error={touched.newPassword && errors.newPassword}
              ></FormInput>
              <FormInput
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                label="Confirm New Password"
                name='confirmPassword'
                error={touched.confirmPassword && errors.confirmPassword}
              ></FormInput>
              <FormButton className="w-100 sitebgcolor" type="submit">
                {!isValid ? "Sending..." : "Send"}
              </FormButton>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ResetPassword;
