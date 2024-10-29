import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RequireAuth from "./hoc/RequireAuth";
import { Dashboard } from "./pages";
import Layout from "./hoc/Layout";
import MeusQuestionarios from "./pages/MeusQuestionarios";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rotas abertas para todos */}
                    <Route path="/login" element={<Login />} />

                    <Route element={<RequireAuth />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route
                                path="/meus-questionarios"
                                element={<MeusQuestionarios />}
                            />
                            <Route
                                path="/minhas-questoes"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/novo-questionario"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/nova-questao"
                                element={<Dashboard />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
