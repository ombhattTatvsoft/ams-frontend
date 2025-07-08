import React, { useState } from "react";
import FormInput from "../../components/common/FormInput";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "./authSlice";
import { Link } from "react-router-dom";
import FormButton from "../../components/common/FormButton";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;
  return (
    <>
      <h4 className="mb-4">Forgot Password</h4>
      <div className="col-10 mb-4">
        <p className="text-muted">
          Enter you email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
          ></FormInput>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={PUBLIC_ROUTES.LOGIN} className="links">
              Back to login
            </Link>
            <FormButton className="sitebgcolor" type="submit">
              {loading ? "Sending..." : "Send"}
            </FormButton>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
