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
import IniciarPartida from "./features/ProfessorDashboard/Jogo/IniciarPartida";
import Jogar from "./features/Jogo/Jogar";
import MinhasPartidas from "./features/ProfessorDashboard/MinhasPartidas";
import { AppRoutes } from "./utils/appRoutes";

function App() {
    return (
        <>
            <ReloadProvider>
                <Toast />
                <BrowserRouter>
                    <Routes>
                        {/* Rotas abertas para todos */}
                        <Route path={AppRoutes.LOGIN} element={<Login />} />

                        <Route element={<RequireAuth />}>
                            <Route element={<Layout />}>
                                <Route
                                    path={AppRoutes.DASHBOARD}
                                    element={<Dashboard />}
                                />
                                <Route
                                    path={AppRoutes.MEUS_QUESTIONARIOS}
                                    element={<MeusQuestionarios />}
                                />
                                <Route
                                    path={AppRoutes.MINHAS_QUESTIONARIOS}
                                    element={<MinhasQuestoes />}
                                />
                                <Route
                                    path={AppRoutes.DETALHAR_QUESTAO}
                                    element={<QuestaoForm />}
                                />
                                <Route
                                    path={AppRoutes.NOVO_QUESTIONARIO}
                                    element={<QuestionarioForm />}
                                />
                                <Route
                                    path={AppRoutes.DETALHAR_QUSETIONARIO}
                                    element={<IniciarQuestionario />}
                                />
                                <Route
                                    path={AppRoutes.NOVA_QUESTAO}
                                    element={<QuestaoForm />}
                                />
                                <Route
                                    path={AppRoutes.CONFIGURACOES}
                                    element={<Configuracoes />}
                                />
                                <Route
                                    path={AppRoutes.GERENCIAR_PARTIDA}
                                    element={<IniciarPartida />}
                                />
                                <Route
                                    path={AppRoutes.MINHAS_PARTIDAS}
                                    element={<MinhasPartidas />}
                                />
                                <Route
                                    path={AppRoutes.EXIBIR_PARTIDA}
                                    element={<MinhasPartidas />}
                                />
                            </Route>
                        </Route>

                        <Route path={AppRoutes.HOME} element={<ConectarSe />} />
                        <Route
                            path={AppRoutes.PEDIR_APELIDO}
                            element={<PedirApelido />}
                        />
                        <Route path={AppRoutes.JOGAR} element={<Jogar />} />
                    </Routes>
                </BrowserRouter>
            </ReloadProvider>
        </>
    );
}

export default App;
