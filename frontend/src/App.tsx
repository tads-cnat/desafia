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
import Jogo from "./features/Jogo";
import JuntarSe from "./features/Jogo/JuntarSe";
import Dashboard from "./features/ProfessorDashboard/Dashboard";

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
                            </Route>
                        </Route>

                        <Route path="/jogar" element={<Jogo />} />
                        <Route path="/jogar" element={<JuntarSe />} />
                    </Routes>
                </BrowserRouter>
            </ReloadProvider>
        </>
    );
}

export default App;
