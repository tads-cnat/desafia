import { useLocation } from "react-router-dom";
import useAuth from "../store/AuthStore";

function Dashboard() {
    const { logout } = useAuth();
    const location = useLocation();

    return (
        <>
            {location.pathname}
            <br />
            <button onClick={logout}> Logout</button>
        </>
    );
}

export default Dashboard;
