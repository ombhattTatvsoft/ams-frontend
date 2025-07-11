import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../features/dashboard/components/Dashboard";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../features/auth/components/Login";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ResetPassword from "../features/auth/components/ResetPassword";
import NotFound from "../common/components/error/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={PUBLIC_ROUTES.HOME} element={<Login />} />
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route
          path={PUBLIC_ROUTES.FORGOT_PASSWORD}
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route
          path={PUBLIC_ROUTES.RESET_PASSWORD}
          element={<ResetPassword></ResetPassword>}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path={PRIVATE_ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
