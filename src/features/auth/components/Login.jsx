import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../../constants/routes";
import FormInput from "../../common/components/FormInput";
import FormButton from "../../common/components/FormButton";
import FormCheckBox from "../../common/components/FormCheckBox";
import Loader from "../../common/components/Loader";
import { Formik } from "formik";
import { loginSchema } from "../authSchema";

export default function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      {loading && <Loader />}
      <h4 className="mb-4">Login</h4>
      <div className="col-10 mb-4">
        <h5>Welcome,</h5>
        <Formik
          initialValues={{ email: "", password: "", rememberme: false }}
          validationSchema={loginSchema}
          onSubmit={(values) => dispatch(loginUser(values))}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                id="loginEmail"
                type="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                label="Email"
                error={touched.email && errors.email}
              ></FormInput>
              <FormInput
                id="loginPassword"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                label="Password"
                error={touched.password && errors.password}
              ></FormInput>
              <div className="d-flex justify-content-between">
                <FormCheckBox
                  id="loginRememberMe"
                  name="rememberme"
                  checked={values.rememberme}
                  onChange={handleChange}
                  label="Remember me"
                ></FormCheckBox>
                <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD} className="links">
                  Forgot Password?
                </Link>
              </div>
              <FormButton className="w-100 sitebgcolor" type="submit">
                {loading ? "Logging in..." : "Login"}
              </FormButton>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
