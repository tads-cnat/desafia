import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Autenticacao/Login";
import RequireAuth from "./hoc/RequireAuth";
import PersistLogin from "./hoc/PersistLogin";
import { Dashboard } from "./pages";
import Layout from "./hoc/Layout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rotas abertas para todos */}
                    <Route path="/login" element={<Login />} />

                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
