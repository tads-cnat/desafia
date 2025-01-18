import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";
import useAuth from "../../store/AuthStore";
import { connectionStatus } from "../../utils/connectionStatus";
import LoadingPage from "../Others/LoadingPage";
import { WebsocketMessage } from "../../types/application/WebsocketMessage";
import { GameState } from "../../types/models/GameState";
import Alternativas from "./Alternativas";

function Jogar(): JSX.Element {
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING);

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
            message: { event, player, target },
        } = socketMessage;

        if (event) {
            if (target === "players") {
                setGameState(event);
            }
        }
    }

    const status = connectionStatus[readyState];

    if (status === "Closed") {
        return <>Houve um erro ao conectar com o servidor</>;
    }

    if (status !== "Open") {
        return <LoadingPage />;
    }

    if (gameState === GameState.WAITING) {
        return (
            <div>
                <h1>Esperando</h1>
            </div>
        );
    }

    if (gameState === GameState.GAME_STARTING) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg" />
                <p className="text-xl">Leia a questão antes de responder!</p>
            </div>
        );
    }

    if (gameState === GameState.QUESTION_ANSWER) {
        return (
            <div>
                <Alternativas />
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
