import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";
import useAuth from "../../store/AuthStore";
import { Action } from "../../types/application/Action";
import { connectionStatus } from "../../utils/connectionStatus";
import LoadingPage from "../Others/LoadingPage";
import { WebsocketMessage } from "../../types/application/WebsocketMessage";

function Jogar(): JSX.Element {
    const [state, setState] = useState<string>("waiting");

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

    function handleEnviarResposta() {
        sendJsonMessage({
            action: "set_answer",
            resposta_id: 1,
            questao_id: 2,
        });
    }

    function handleMudarEstadoJogo() {
        sendJsonMessage({
            action: "change_state",
            state: "playing",
        });
    }

    function takeAction(socketMessage: WebsocketMessage) {
        const {
            message: { event },
        } = socketMessage;

        switch (event) {
            case "game_start":
                console.log("O JOGO TA ROLANDO AGORA!!!!");
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
    return (
        <>
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleEnviarResposta}
            >
                Enviar resposta mockada
            </button>
            <button
                className="btn btn-primary"
                type="button"
                onClick={handleMudarEstadoJogo}
            >
                handleMudarEstadoJogo
            </button>
        </>
    );
}

export default Jogar;
