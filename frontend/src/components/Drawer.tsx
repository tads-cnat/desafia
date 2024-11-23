import { Link } from "react-router-dom";
import useAuth from "../store/AuthStore";
import ThemeChanger from "./ThemeChanger";

interface DrawerProps {
    children: React.ReactNode;
}

function Drawer(props: DrawerProps): JSX.Element {
    const { children } = props;
    const { logout } = useAuth();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-w-full min-h-screen">
                <ThemeChanger />
                <div className="container mx-auto my-5">{children}</div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <ul className="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <Link to="/">Início</Link>
                    </li>
                    <li>
                        <Link to="/minhas-questoes">Minhas questões</Link>
                    </li>
                    <li>
                        <Link to="/meus-questionarios">Meus questionários</Link>
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
