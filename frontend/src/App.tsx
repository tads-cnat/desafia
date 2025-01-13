import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./hoc/Layout";
import MeusQuestionarios from "./features/ProfessorDashboard/MeusQuestionarios";
import MinhasQuestoes from "./features/ProfessorDashboard/MinhasQuestoes";
import QuestaoForm from "./features/ProfessorDashboard/QuestaoForm";
import "react-loading-skeleton/dist/skeleton.css";
import Toast from "./components/Toast";
import Configuracoes from "./features/ProfessorDashboard/Configuracoes";
import QuestionarioForm from "./features/ProfessorDashboard/QuestionarioForm";
import { ReloadProvider } from "./contexts/ReloadContext";
import IniciarQuestionario from "./features/ProfessorDashboard/IniciarQuestionario";
import ConectarSe from "./features/Jogo/ConectarSe";
import Dashboard from "./features/ProfessorDashboard/Dashboard";
import PedirApelido from "./features/Jogo/PedirApelido";
import GerenciarPartida from "./features/ProfessorDashboard/GerenciarPartida";
import Jogar from "./features/Jogo/Jogar";
import MinhasPartidas from "./features/ProfessorDashboard/MinhasPartidas";

function App() {
    return (
        <>
            <ReloadProvider>
                <Toast />
                <BrowserRouter>
                    <Routes>
                        {/* Rotas abertas para todos */}
                        <Route path="/login" element={<Login />} />

                        <Route element={<RequireAuth />}>
                            <Route element={<Layout />}>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
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
                                    element={<QuestionarioForm />}
                                />
                                <Route
                                    path="/questionario/:id"
                                    element={<IniciarQuestionario />}
                                />
                                <Route
                                    path="/nova-questao"
                                    element={<QuestaoForm />}
                                />
                                <Route
                                    path="/configuracoes"
                                    element={<Configuracoes />}
                                />
                                <Route
                                    path="/gerenciar-partida"
                                    element={<GerenciarPartida />}
                                />
                                <Route
                                    path="/minhas-partidas"
                                    element={<MinhasPartidas />}
                                />
                            </Route>
                        </Route>

                        <Route path="/" element={<ConectarSe />} />
                        <Route
                            path="/partida/pedir-apelido"
                            element={<PedirApelido />}
                        />
                        <Route path="/partida/jogar" element={<Jogar />} />
                    </Routes>
                </BrowserRouter>
            </ReloadProvider>
        </>
    );
}

export default App;
