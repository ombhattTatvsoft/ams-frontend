import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes";
import AuthLayout from "../layouts/AuthLayout";
import MainLaoyout from "../layouts/MainLaoyout";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route path={PUBLIC_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PUBLIC_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLaoyout/>}>
          <Route path={PRIVATE_ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
