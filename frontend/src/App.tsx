import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Dashboard } from "./pages";
import Escolhas from "./pages/Escolhas";
import ResultadoQuestao from "./pages/ResultadoQuestao";
import Esperando from "./pages/Esperando";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/escolhas" element={<Escolhas />} />
                    <Route path="/resultado" element={<ResultadoQuestao />} />
                    <Route path="/esperando" element={<Esperando />} />
                    <Route element={<ProtectedRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
