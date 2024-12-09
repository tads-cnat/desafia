import { Link } from "react-router-dom";
import useAuth from "../store/AuthStore";

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
                        <div className="flex justify-center items-center gap-4 w-full">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                    <span className="text-3xl">D</span>
                                </div>
                            </div>
                            <p>Nome do usuário</p>
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
