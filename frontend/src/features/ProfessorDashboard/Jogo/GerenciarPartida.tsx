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
import MostrarResultados from "./MostrarResultados";
import { Questao } from "../../../types/models/Questao";
import { Alternativa } from "../../../types/models/Alternativa";
import { useNavigate } from "react-router-dom";

function GerenciarPartida(): JSX.Element {
    const { auth } = useAuth();
    const { gameId, accessCode } = useGameStore();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [questionario, setQuestionario] = useState<Questionario>();
    const [questaoAtual, setQuestaoAtual] = useState<number>(0);
    const [socketUrl] = useState<string>(
        `ws://${import.meta.env.VITE_HOST}/ws/game/${gameId}/`,
    );
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
    const navigate = useNavigate();

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
            })
            .catch((err) => {
                console.error(err);
                if (err.status === 404) {
                    toast.error("Partida não encontrada");
                    navigate(-1);
                }
            });
    }, []);

    function takeAction(response: WebsocketMessage) {
        if (response.error) {
            toast.error(response.error);
            return;
        }
        const {
            message: { event, player, target },
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
            case GameState.PLAYER_LEFT:
                setParticipantes((prev) => {
                    return prev.filter((item) => item.id !== player.id);
                });
                break;
            default:
                if (["all", "admin"].includes(target)) {
                    setGameState(event);
                }
                break;
        }
    }

    function broadcastAction(state: GameState) {
        sendJsonMessage({
            action: GameAction.CHANGE_STATE,
            target: "all",
            state,
        });
    }

    function disconnectPlayer(id_participante: number) {
        sendJsonMessage({
            action: GameAction.FORCE_DISCONNECT,
            target: "system",
            id_participante,
        });
    }

    function sendActionToPlayers(state: GameState, data?: unknown) {
        sendJsonMessage({
            action: GameAction.CHANGE_STATE,
            target: "players",
            data,
            state,
        });
    }

    function sendQuestionToPlayers(questao?: Questao) {
        const modifiedQuestao = {
            id: questao?.id,
            alternativas: questao?.alternativas?.map((a: Alternativa) => ({
                id: a.id,
            })),
        };

        sendActionToPlayers(GameState.QUESTION_ANSWER, modifiedQuestao);
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
                    onZero={() => {
                        broadcastAction(GameState.NEXT_QUESTION);
                        sendQuestionToPlayers(
                            questionario?.questoes[questaoAtual],
                        );
                    }}
                />
            </div>
        );
    }

    if ([GameState.NEXT_QUESTION, GameState.TIMES_UP].includes(gameState)) {
        if (
            gameState === GameState.NEXT_QUESTION &&
            questaoAtual === questionario?.questoes.length
        ) {
            broadcastAction(GameState.GAME_ENDED);
        }

        return (
            <ExibirQuestao
                questao={questionario?.questoes[questaoAtual]}
                onZero={() => {
                    broadcastAction(GameState.TIMES_UP);
                }}
                onNextQuestion={() => {
                    setQuestaoAtual((prev) => prev + 1);
                    broadcastAction(GameState.RESULTS_SHOWING);
                }}
                questaoAtual={questaoAtual + 1}
                totalQuestoes={questionario?.questoes.length}
                state={gameState}
                showCounter={gameState !== GameState.TIMES_UP}
            />
        );
    }

    if ([GameState.RESULTS_SHOWING, GameState.GAME_ENDED].includes(gameState)) {
        return (
            <MostrarResultados
                onNextQuestion={() => {
                    broadcastAction(GameState.NEXT_QUESTION);
                    sendQuestionToPlayers(questionario?.questoes[questaoAtual]);
                }}
                questaoAtual={questaoAtual + 1}
                totalQuestoes={questionario?.questoes.length}
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
                        broadcastAction(GameState.GAME_STARTING);
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
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    disconnectPlayer(participante.id ?? 0);
                                }}
                            >
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
