import { useEffect, useState } from "react";
import PartidaService from "../../../services/PartidaService";
import { useGameStore } from "../../../store/GameStore";
import { Participante } from "../../../types/models/Participante";

interface MostrarResultadosProps {
    onNextQuestion: () => void;
}

function MostrarResultados({
    onNextQuestion,
}: MostrarResultadosProps): JSX.Element {
    const { gameId } = useGameStore();
    const [participantes, setParticipantes] = useState<Participante[]>([]);

    useEffect(() => {
        PartidaService.podio(String(gameId))
            .then((res) => {
                setParticipantes(res.data);
            })
            .catch((err) => {});
    }, []);

    const podiumColors = ["text-warning", "text-secondary", "text-neutral"];

    return (
        <>
            <div className="navbar bg-base-300 ">
                <div className="navbar-start" />
                <div className="navbar-center">Resultados da rodada</div>
                <div className="navbar-end self-end">
                    <a className="btn" onClick={onNextQuestion}>
                        Próxima questão
                    </a>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-center my-8"> Placar </h2>

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
