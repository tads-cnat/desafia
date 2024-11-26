import useAuth from "../store/AuthStore";

function Dashboard() {
    const { logout } = useAuth();

    return (
        <div className="flex justify-between w-100">
            <h1 className="text-2xl">Dashboard</h1>
        </div>
    );
}

export default Dashboard;
