import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useGameStore } from "../../store/GameStore";

function Jogar(): JSX.Element {
    const [searchParams] = useSearchParams();
    const { gameId, name, playerId } = useGameStore();
    const [wsURL, setWsURL] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
    );

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(wsURL, {
        queryParams: {
            nome: name as string,
            player_id: playerId as number,
        },
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    useEffect(() => {
        console.log(connectionStatus);
    }, [readyState]);

    useEffect(() => {
        console.log("lastMessage", lastMessage);
    }, [lastMessage]);

    function handleEnviarResposta() {
        sendJsonMessage({
            action: "set_answer",
            resposta_id: 1,
            questao_id: 2,
        });
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
        </>
    );
}

export default Jogar;
