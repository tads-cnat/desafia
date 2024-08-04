import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Dashboard } from "./pages";
import Escolhas from "./pages/Escolhas";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/escolhas" element={<Escolhas />} />
                    <Route element={<ProtectedRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
