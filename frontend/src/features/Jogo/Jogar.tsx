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
import { set } from "date-fns";

function Jogar(): JSX.Element {
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
    const [waitingMessage, setWaitingMessage] = useState<string>(
        "Aguardando resultados!",
    );
    const [answer, setAnswer] = useState<{
        pontuacao: number;
        correta: boolean;
    }>({ pontuacao: 0, correta: false });
    const [questaoAtual, setQuestaoAtual] = useState<Questao>();
    const { gameId, name, playerId } = useGameStore();
    const { auth } = useAuth();
    const [wsURL, setWsURL] = useState<string>(
        `ws://${import.meta.env.VITE_HOST}/ws/game/${gameId}/`,
    );

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
            if (event === GameState.QUESTION_ANSWER) {
                setQuestaoAtual(data as Questao);
            }

            console.log("Event", event);

            if (event === GameState.RESULTS_SHOWING) {
                const {
                    message: { pontuacao = 0, correta = false },
                } = socketMessage;

                setAnswer({ pontuacao, correta });
                console.log({ pontuacao, correta });
            }

            setGameState(event);
        }
    }

    function sendAnswer(respostaId?: number) {
        setGameState(GameState.WAITING);
        sendJsonMessage({
            action: GameAction.SET_ANSWER,
            resposta_id: respostaId,
            questao_id: questaoAtual?.id,
        });
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
                    <span className="loading loading-spinner loading-lg" />
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

    if (gameState === GameState.TIMES_UP) {
        return (
            <div>
                <h1>O tempo acabou!</h1>
            </div>
        );
    }

    if (gameState === GameState.RESULTS_SHOWING) {
        return (
            <div>
                <h1>Mostrando resultados!</h1>
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

    if (gameState === GameState.DISCONNECTED) {
        return (
            <div>
                <h1>Você foi desconectado!</h1>
            </div>
        );
    }

    return <></>;
}

export default Jogar;
