import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Autenticacao/Login";
import RequireAuth from "./hoc/RequireAuth";
import PersistLogin from "./hoc/PersistLogin";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rotas abertas para todos */}
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/registro" element={<Registro />} /> */}
                    {/* <Route path="/" element={<Home />}></Route> */}

                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
