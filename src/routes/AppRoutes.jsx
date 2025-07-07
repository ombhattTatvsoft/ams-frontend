import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../features/auth/LoginPage";
import Dashboard from "../features/dashboard/Dashboard";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={PRIVATE_ROUTES.DASHBOARD} element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
