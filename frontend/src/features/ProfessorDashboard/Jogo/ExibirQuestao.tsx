import { GameState } from "../../../types/models/GameState";
import { Questao } from "../../../types/models/Questao";
import Countdown from "./Countdown";

interface ExibirQuestaoProps {
    questao?: Questao;
    onZero: () => void;
    onNextQuestion: () => void;
    state: GameState;
}

function ExibirQuestao({
    questao,
    onZero,
    onNextQuestion,
    state,
}: ExibirQuestaoProps): JSX.Element {
    const alternativaColor: Record<number, string> = {
        0: "bg-success",
        1: "bg-warning",
        2: "bg-error",
        3: "bg-info",
    };

    const { alternativas } = questao || {};

    const alternativasArray = alternativas?.map((alternativa, index) => {
        return { ...alternativa, color: alternativaColor[index] };
    });

    return (
        <>
            <div className="flex flex-col min-h-screen items-center">
                <div className="flex-none navbar bg-base-300 ">
                    <div className="navbar-start" />
                    <div className="navbar-center">Resultados da rodada</div>
                    <div className="navbar-end self-end">
                        <a className="btn" onClick={onNextQuestion}>
                            Próxima questão
                        </a>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-around">
                    <div className="dark:bg-neutral-900/80 p-8 ">
                        <h1 className="text-6xl text-center font-bold dark:text-neutral-50 text-neutral-900">
                            {questao?.enunciado}
                            {"   "}
                            <Countdown counter={10} onZero={onZero} />
                        </h1>
                    </div>

                    <div className="grid">
                        <div className="grid grid-cols-2 gap-2 ">
                            {alternativasArray?.map((alternativa, index) => (
                                <div
                                    key={index}
                                    className={
                                        alternativa.color +
                                        " p-10 text-4xl font-semibold rounded-xl dark:text-neutral-50 " +
                                        (state === GameState.TIMES_UP &&
                                        !alternativa.correta
                                            ? "opacity-20"
                                            : "")
                                    }
                                >
                                    {alternativa.texto}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExibirQuestao;
