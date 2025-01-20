import { useEffect, useState } from "react";
import PartidaService from "../../../services/PartidaService";
import { useGameStore } from "../../../store/GameStore";
import { Participante } from "../../../types/models/Participante";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../utils/appRoutes";

interface MostrarResultadosProps {
    onNextQuestion: () => void;
    totalQuestoes?: number;
    questaoAtual?: number;
}

function MostrarResultados({
    onNextQuestion,
    questaoAtual,
    totalQuestoes,
}: MostrarResultadosProps): JSX.Element {
    const { gameId } = useGameStore();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [lastQuestion, setLastQuestion] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        PartidaService.podio(String(gameId))
            .then((res) => {
                setParticipantes(res.data);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        if (totalQuestoes && questaoAtual)
            setLastQuestion(questaoAtual > totalQuestoes);
    }, [questaoAtual]);

    function goToReports() {
        navigate(AppRoutes.DASHBOARD);
    }

    const podiumColors = ["text-warning", "text-secondary", "text-neutral"];

    return (
        <>
            <div className="navbar bg-base-300 ">
                <div className="navbar-start" />
                <div className="navbar-center">Resultados da rodada</div>
                <div className="navbar-end self-end">
                    {!lastQuestion ? (
                        <a className="btn" onClick={onNextQuestion}>
                            Próxima questão
                        </a>
                    ) : (
                        <a className="btn btn-error" onClick={goToReports}>
                            Fim
                        </a>
                    )}
                </div>
            </div>

            {!lastQuestion ? (
                <h2 className="text-2xl font-bold text-center my-8">Placar</h2>
            ) : (
                <h2 className="text-4xl font-bold text-center my-8">
                    Resultado Final
                </h2>
            )}

            <div className="flex flex-1 flex-col max-w-2xl m-auto">
                {participantes.map((participante, index) => (
                    <>
                        <div key={participante.id}>
                            <div className="divider" />
                            <div className="flex gap-8 items-center px-10">
                                <h2
                                    className={
                                        "text-3xl font-extrabold " +
                                        (podiumColors[index] ?? "text-neutral")
                                    }
                                >
                                    {`${index + 1}º`}
                                </h2>
                                <div className="flex w-full items-center justify-between">
                                    <h2 className="text-2xl">
                                        {participante.nome}
                                    </h2>
                                    <h2 className="font-bold text-4xl">
                                        {participante.pontuacao_total}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </>
                ))}

                <div className="divider mb-0" />
            </div>
        </>
    );
}

export default MostrarResultados;
