import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLoading = false;
  const isAuthenticated = false;

  if (isLoading) {
    return <div className="spinner-border spinner-border-sm" role="status" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
