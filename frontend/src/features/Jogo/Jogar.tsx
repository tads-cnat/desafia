import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";
import useAuth from "../../store/AuthStore";
import { Action } from "../../types/application/Action";

function Jogar(): JSX.Element {
    const [state, setState] = useState<string>("waiting");

    const { gameId, name, playerId } = useGameStore();
    const { auth } = useAuth();
    const [wsURL, setWsURL] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
    );

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(wsURL, {
        queryParams: {
            nome: name as string,
            player_id: playerId as number,
            token: auth?.access as string,
        },
    });

    useEffect(() => {
        if (lastMessage) {
            const message = JSON.parse(lastMessage?.data);

            takeAction(message);
        }
    }, [lastMessage]);

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

    function takeAction(message: Action) {
        const { type } = message;

        switch (type) {
            case "change_state":
                setState(message.state as string);
        }
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
