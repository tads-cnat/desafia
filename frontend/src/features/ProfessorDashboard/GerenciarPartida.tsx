import { useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useAuth from "../../store/AuthStore";

function GerenciarPartida(): JSX.Element {
    const location = useLocation();
    const { partida } = location.state || {};
    const { auth } = useAuth();
    const [socketUrl, setSocketUrl] = useState<string>(
        `ws://localhost:8000/ws/game/${partida.codigo_acesso}/`,
    );
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            queryParams: {
                token: auth?.access as string,
            },
        },
    );

    return (
        <div className="my-5 grid gap-5">
            <div className="animation-container">
                <h1 className="text-5xl text-center font-bold">
                    {partida?.codigo_acesso}
                </h1>
            </div>
        </div>
    );
}

export default GerenciarPartida;
