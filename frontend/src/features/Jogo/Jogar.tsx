import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";
import useAuth from "../../store/AuthStore";
import { connectionStatus } from "../../utils/connectionStatus";
import LoadingPage from "../Others/LoadingPage";
import { WebsocketMessage } from "../../types/application/WebsocketMessage";
import { GameState } from "../../types/models/GameState";
import Alternativas from "./Alternativas";
import { GameAction } from "../../types/application/GameAction";
import { Questao } from "../../types/models/Questao";
import MostrarResposta from "./MostrarResposta";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../utils/appRoutes";
import { toast } from "sonner";

function Jogar(): JSX.Element {
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
    const [waitingMessage, setWaitingMessage] = useState<string>(
        "Aguardando o jogo começar!",
    );
    const [answer, setAnswer] = useState<{
        pontuacao: number;
        correta: boolean;
    }>({ pontuacao: 0, correta: false });
    const [questaoAtual, setQuestaoAtual] = useState<Questao>();
    const { gameId, name, playerId } = useGameStore();
    const { auth } = useAuth();
    const [wsURL] = useState<string>(
        `ws://${import.meta.env.VITE_HOST}/ws/game/${gameId}/`,
    );
    const navigate = useNavigate();

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsURL,
        {
            queryParams: {
                nome: name as string,
                player_id: playerId as number,
                token: auth?.access as string,
            },
        },
    );

    useEffect(() => {
        if (lastJsonMessage) {
            takeAction(lastJsonMessage as WebsocketMessage);
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        console.log("Status", gameState);
    }, [gameState]);

    function takeAction(socketMessage: WebsocketMessage) {
        const {
            message: { event, target, data },
        } = socketMessage;

        if (event && ["players", "all"].includes(target)) {
            if (event === GameState.DISCONNECTED) {
                setGameState(GameState.DISCONNECTED);
                toast.error("Você foi desconectado do jogo!");
                navigate(AppRoutes.HOME);
            }

            if (event === GameState.QUESTION_ANSWER) {
                setQuestaoAtual(data as Questao);
            }

            if (event === GameState.WAITING) {
                const {
                    message: { pontuacao, correta },
                } = socketMessage;

                setAnswer({
                    pontuacao: pontuacao ?? 0,
                    correta: correta ?? false,
                });
            }

            if (event === GameState.NEXT_QUESTION) {
                setAnswer({ pontuacao: 0, correta: false });
            }

            setGameState(event);
        }
    }

    function sendAnswer(respostaId?: number, elapsedTime?: number) {
        setGameState(GameState.WAITING);
        sendJsonMessage({
            action: GameAction.SET_ANSWER,
            resposta_id: respostaId,
            questao_id: questaoAtual?.id,
            elapsed_time: elapsedTime,
        });
        setWaitingMessage("Aguardando o resultado!  ");
    }

    const status = connectionStatus[readyState];

    if (status === "Closed") {
        return <>Houve um erro ao conectar com o servidor</>;
    }

    if (status !== "Open") {
        return <LoadingPage />;
    }

    if ([GameState.WAITING, GameState.GAME_STARTING].includes(gameState)) {
        return (
            <div>
                <div className="flex flex-col justify-center items-center h-screen">
                    <span className="loading loading-dots loading-lg" />
                    <p className="text-xl">{waitingMessage}</p>
                </div>
            </div>
        );
    }

    if (gameState === GameState.QUESTION_ANSWER) {
        return (
            <div>
                <Alternativas questao={questaoAtual} onClick={sendAnswer} />
            </div>
        );
    }

    if ([GameState.TIMES_UP, GameState.RESULTS_SHOWING].includes(gameState)) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <MostrarResposta
                    correta={answer.correta}
                    pontos={answer.pontuacao}
                />
            </div>
        );
    }

    if (gameState === GameState.GAME_ENDED) {
        return (
            <div>
                <h1>O jogo terminou!</h1>
            </div>
        );
    }

    return <></>;
}

export default Jogar;
