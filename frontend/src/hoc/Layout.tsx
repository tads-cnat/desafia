import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";

function Layout(): JSX.Element {
    return (
        <Drawer>
            <Outlet />
        </Drawer>
    );
}

export default Layout;
