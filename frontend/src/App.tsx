import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Dashboard } from "./pages";
import PartidaJogador from "./pages/PartidaJogador";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/partida" element={<PartidaJogador />} />
                    <Route element={<ProtectedRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
