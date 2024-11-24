import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RequireAuth from "./hoc/RequireAuth";
import { Dashboard } from "./pages";
import Layout from "./hoc/Layout";
import MeusQuestionarios from "./pages/MeusQuestionarios";
import MinhasQuestoes from "./pages/MinhasQuestoes";
import QuestaoForm from "./pages/QuestaoForm";
import "react-loading-skeleton/dist/skeleton.css";
import Toast from "./components/Toast";
import Configuracoes from "./pages/Configuracoes";

function App() {
    return (
        <>
            <Toast />
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
                                element={<MinhasQuestoes />}
                            />
                            <Route
                                path="/questao/:id/"
                                element={<QuestaoForm />}
                            />
                            <Route
                                path="/novo-questionario"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/nova-questao"
                                element={<QuestaoForm />}
                            />
                            <Route
                                path="/configuracoes"
                                element={<Configuracoes />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
