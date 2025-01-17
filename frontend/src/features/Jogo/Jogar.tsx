import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";
import useAuth from "../../store/AuthStore";
import { connectionStatus } from "../../utils/connectionStatus";
import LoadingPage from "../Others/LoadingPage";
import { WebsocketMessage } from "../../types/application/WebsocketMessage";
import { GameState } from "../../types/models/GameState";

function Jogar(): JSX.Element {
    const [state, setState] = useState<GameState>(GameState.WAITING);

    const { gameId, name, playerId } = useGameStore();
    const { auth } = useAuth();
    const [wsURL, setWsURL] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
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
        console.log("Status", state);
    }, [state]);

    function takeAction(socketMessage: WebsocketMessage) {
        const {
            message: { event },
        } = socketMessage;

        switch (event) {
            case "game_start":
                setState(GameState.GAME_STARTING);
                break;
            case "next_question":
                setState(GameState.QUESTION_ANSWER);
                break;
            case "times_up":
                setState(GameState.TIMES_UP);
                break;
            case "show_result":
                setState(GameState.RESULTS_SHOWING);
                break;
            case "end_game":
                setState(GameState.GAME_ENDED);
                break;
            case "force_disconnect":
                setState(GameState.DISCONNECTED);
                break;
        }
    }

    const status = connectionStatus[readyState];

    if (status === "Closed") {
        return <>Houve um erro ao conectar com o servidor</>;
    }

    if (status !== "Open") {
        return <LoadingPage />;
    }

    if (state === GameState.WAITING) {
        return (
            <div>
                <h1>Esperando</h1>
            </div>
        );
    }

    if (state === GameState.GAME_STARTING) {
        return (
            <div>
                <h1>O jogo está começando!</h1>
            </div>
        );
    }

    if (state === GameState.QUESTION_ANSWER) {
        return (
            <div>
                <h1>Responda a pergunta!</h1>
            </div>
        );
    }

    if (state === GameState.TIMES_UP) {
        return (
            <div>
                <h1>O tempo acabou!</h1>
            </div>
        );
    }

    if (state === GameState.RESULTS_SHOWING) {
        return (
            <div>
                <h1>Mostrando resultados!</h1>
            </div>
        );
    }

    if (state === GameState.GAME_ENDED) {
        return (
            <div>
                <h1>O jogo terminou!</h1>
            </div>
        );
    }

    if (state === GameState.DISCONNECTED) {
        return (
            <div>
                <h1>Você foi desconectado!</h1>
            </div>
        );
    }

    return <></>;
}

export default Jogar;
