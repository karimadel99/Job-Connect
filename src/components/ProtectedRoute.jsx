import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;