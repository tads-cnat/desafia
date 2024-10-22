import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Autenticacao/Login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rotas abertas para todos */}
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/registro" element={<Registro />} /> */}
                    {/* <Route path="/" element={<Home />}></Route> */}

                    <Route element={<ProtectedRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
