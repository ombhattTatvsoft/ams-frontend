import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../constants/routes';
 

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.LOGIN} />;
}