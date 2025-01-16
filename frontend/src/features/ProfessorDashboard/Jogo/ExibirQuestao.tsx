import { useState } from "react";
import { useGameStore } from "../../../store/GameStore";
import useWebSocket from "react-use-websocket";
import useAuth from "../../../store/AuthStore";

function ExibirQuestao(): JSX.Element {
    const { gameId, name, playerId } = useGameStore();
    const { auth } = useAuth();

    const [wsURL] = useState<string>(`ws://localhost:8000/ws/game/${gameId}/`);

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

    return (
        <div>
            <h1>Exibir Questão</h1>
        </div>
    );
}

export default ExibirQuestao;
