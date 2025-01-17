import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import useAuth from "../../../store/AuthStore";
import { useGameStore } from "../../../store/GameStore";
import { Participante } from "../../../types/models/Participante";
import PartidaService from "../../../services/PartidaService";
import { WebsocketMessage } from "../../../types/application/WebsocketMessage";
import { connectionStatus } from "../../../utils/connectionStatus";
import LoadingPage from "../../Others/LoadingPage";
import { GameState } from "../../../types/models/GameState";
import { GameAction } from "../../../types/application/GameAction";
import Countdown from "./Countdown";
import { toast } from "sonner";
import ExibirQuestao from "./ExibirQuestao";
import { Questionario } from "../../../types/models/Questionario";

function GerenciarPartida(): JSX.Element {
    const { auth } = useAuth();
    const { gameId, accessCode } = useGameStore();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [questionario, setQuestionario] = useState<Questionario>();
    const [questaoAtual, setQuestaoAtual] = useState<number>(0);
    const [socketUrl] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
    );
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            queryParams: {
                token: auth?.access as string,
            },
            share: true,
        },
    );

    const status = connectionStatus[readyState];

    useEffect(() => {
        if (!lastJsonMessage) return;
        takeAction(lastJsonMessage as WebsocketMessage);
    }, [lastJsonMessage]);

    useEffect(() => {
        if (!gameId) return;
        PartidaService.participantes(gameId)
            .then(({ data }) => {
                setParticipantes(data);
            })
            .catch((err) => {
                console.error(err);
            });

        PartidaService.get(gameId)
            .then((res) => {
                const { questionario } = res;
                setQuestionario(questionario);
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function takeAction(response: WebsocketMessage) {
        if (response.error) {
            toast.error(response.error);
            return;
        }
        const {
            message: { event, player },
        } = response;

        switch (event) {
            case GameState.PLAYER_JOINED:
                setParticipantes((prev) => {
                    const alreadyExists = prev.some(
                        (item) => item.id === player.id,
                    );
                    if (alreadyExists) return prev;
                    return [...prev, player];
                });
                break;
            default:
                setGameState(event);
                break;
        }
    }

    function sendAction(state: GameState) {
        sendJsonMessage({
            action: GameAction.CHANGE_STATE,
            state,
        });
    }

    if (status === "Closed") {
        return <>Houve um erro ao conectar com o servidor</>;
    }

    if (status !== "Open") {
        return <LoadingPage />;
    }

    if (gameState === GameState.GAME_STARTING) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Countdown
                    counter={5}
                    onZero={() => sendAction(GameState.NEXT_QUESTION)}
                />
            </div>
        );
    }

    if ([GameState.NEXT_QUESTION, GameState.TIMES_UP].includes(gameState)) {
        return (
            <ExibirQuestao
                questao={questionario?.questoes[questaoAtual]}
                onZero={() => {
                    sendAction(GameState.TIMES_UP);
                }}
                state={gameState}
            />
        );
    }

    return (
        <div className="my-5 mx-4 grid grid-cols-2 gap-5">
            <div className="flex justify-between col-span-2">
                <h1 className="text-5xl text-center col-span-2 font-bold">
                    {accessCode}
                </h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        sendAction(GameState.GAME_STARTING);
                    }}
                >
                    <i className="fa-solid fa-play" />
                    Iniciar Jogo
                </button>
            </div>

            <h1 className="text-3xl col-span-2 font-semibold">Jogadores</h1>

            {participantes?.map((participante) => {
                return (
                    <div
                        className="p-4 col-span-1 border rounded-3xl border-base-200"
                        key={participante.id}
                    >
                        <div className="flex justify-between items-center px-3">
                            <h2 className="text-2xl ">{participante.nome}</h2>
                            <button className="btn btn-ghost">
                                <i className="fa-solid fa-times" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default GerenciarPartida;
