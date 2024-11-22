import useAuth from "../store/AuthStore";

function Dashboard() {
    const { logout } = useAuth();

    return (
        <>
            <button className="btn btn-primary" onClick={logout}>
                Logout
            </button>
        </>
    );
}

export default Dashboard;
