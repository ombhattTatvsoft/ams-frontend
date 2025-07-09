import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../constants/routes";
import FormInput from "../../common/components/FormInput";
import FormButton from "../../common/components/FormButton";
import FormCheckBox from "../../common/components/FormCheckBox";
import Loader from "../../common/components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  
  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <>
      {loading && <Loader/>}
      <h4 className="mb-4">Login</h4>
      <div className="col-10 mb-4">
        <h5>Welcome,</h5>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="loginEmail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
          ></FormInput>
          <FormInput
            id="loginPassword"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            label="Password"
          ></FormInput>
          <div className="d-flex justify-content-between">
            <FormCheckBox
              id="loginRememberMe"
              checked={form.rememberme}
              onChange={(e) =>
                setForm({ ...form, rememberme: e.target.checked })
              }
              label="Remember me"
            ></FormCheckBox>
            <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD} className="links">
              Forgot Password?
            </Link>
          </div>
          <FormButton className="w-100 sitebgcolor" type="submit">{loading ? "Logging in..." : "Login"}</FormButton>
        </form>
      </div>
    </>
  );
}
