import { Link } from "react-router-dom";
import useAuth from "../store/AuthStore";
import avatar from "../assets/imgs/avatar.png";

interface DrawerProps {
    children: React.ReactNode;
}

function Drawer(props: DrawerProps): JSX.Element {
    const { children } = props;
    const { auth, logout } = useAuth();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-w-full min-h-screen">
                <div className="py-5 mx-auto h-full max-w-screen-lg">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <ul className="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col items-center sticky top-0 overflow-y-auto space-y-4 w-72 py-6 px-4 bg-base-200">
                            <a className="btn btn-ghost text-lg">Desafia</a>

                            <img
                                alt="Profile"
                                src={avatar}
                                className="w-32 rounded-full"
                            />

                            <h2 className="font-bold text-lg">
                                {auth?.user?.nome}
                            </h2>
                        </div>
                        <div className="divider mx-auto" />
                        <li>
                            <Link to="/">Início</Link>
                        </li>
                        <li>
                            <Link to="/minhas-questoes">Minhas questões</Link>
                        </li>
                        <li>
                            <Link to="/meus-questionarios">
                                Meus questionários
                            </Link>
                        </li>

                        <li>
                            <Link to="/configuracoes">Configurações</Link>
                        </li>
                    </div>
                    <li>
                        <a onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Drawer;
