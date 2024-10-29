import useAuth from "../../store/AuthStore";

function Dashboard() {
    const { logout } = useAuth();

    return (
        <>
            <button onClick={logout}> Logout</button>
        </>
    );
}

export default Dashboard;
