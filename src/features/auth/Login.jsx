import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../constants/routes";
import FormInput from "../../components/common/FormInput";
import FormCheckBox from "../../components/common/FormCheckBox";
import FormButton from "../../components/common/FormButton";

export default function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <>
      <h4 className="mb-4">Login</h4>
      <div className="col-10 mb-4">
        <h5>Welcome,</h5>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
          ></FormInput>
          <FormInput
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            label="Password"
          ></FormInput>
          <div className="d-flex justify-content-between">
            <FormCheckBox
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
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </>
  );
}
