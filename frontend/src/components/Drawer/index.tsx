import useAuth from "../../store/AuthStore";

interface DrawerProps {
    children: React.ReactNode;
}

function Drawer(props: DrawerProps): JSX.Element {
    const { children } = props;
    const { logout } = useAuth();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">{children}</div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <ul className="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <a>Minhas questões</a>
                    </li>
                    <li>
                        <a>Meus questionários</a>
                    </li>
                    <li>
                        <a>Histórico</a>
                    </li>
                    <li>
                        <a onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Drawer;
