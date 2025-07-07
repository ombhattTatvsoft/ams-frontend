import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../constants/routes";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({ email: "", password: "",rememberme: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (isAuthenticated) return <Navigate to={PRIVATE_ROUTES.DASHBOARD} />;

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="d-flex col-xxl-4 col-xl-6 col-md-8 col-11 flex-column align-items-center justify-content-center card border-3 bg-white rounded-4">
        <div className="d-flex align-items-center gap-1 my-4 bg-dark text-white rounded-3 p-1">
          <img src="~/images/AMS_logo_2.png" className="img-fluid" style={{ height: "60px" }} alt="" />
          <span className="me-3 h3 mb-0">AMS</span>
        </div>
        <h4 className="mb-4">Login</h4>
        <div className="col-10 mb-4">
          <h5>Welcome,</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder=""
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label>Email</label>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type="password"
                className="form-control"
                id="userPassword"
                placeholder=""
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <label>Password</label>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex px-1">
                <input type="checkbox" className="form-check-input" id="rememberMe"
                value={form.rememberme}
                onChange={(e) => setForm({ ...form, rememberme: e.target.value })}
                 />
                <label className="form-check-label ms-2" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>
            <div className="my-2">
              <button
                className="w-100 btn sitebgcolor"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}