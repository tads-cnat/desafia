import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../store/AuthStore";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.access ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
