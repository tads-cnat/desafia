import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import useAuth from "../../../store/AuthStore";
import { useGameStore } from "../../../store/GameStore";
import { Participante } from "../../../types/models/Participante";
import PartidaService from "../../../services/PartidaService";
import { WebsocketMessage } from "../../../types/application/WebsocketMessage";
import { connectionStatus } from "../../../utils/connectionStatus";
import LoadingPage from "../../Others/LoadingPage";

function GerenciarPartida(): JSX.Element {
    const { auth } = useAuth();
    const { gameId, accessCode } = useGameStore();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [socketUrl] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
    );

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
        console.log("Status", status);
    }, [status]);

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
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function takeAction(response: WebsocketMessage) {
        const {
            message: { event, player },
        } = response;

        switch (event) {
            case "player_joined":
                setParticipantes((prev) => {
                    const alreadyExists = prev.some(
                        (item) => item.id === player.id,
                    );
                    if (alreadyExists) return prev;

                    return [...prev, player];
                });
                break;
        }
    }

    function handleIniciarJogo() {
        sendJsonMessage({
            action: "change_state",
            state: "game_start",
        });
    }

    if (status === "Closed") {
        return <>Houve um erro ao conectar com o servidor</>;
    }

    if (status !== "Open") {
        return <LoadingPage />;
    }

    return (
        <div className="my-5 mx-4 grid grid-cols-2 gap-5">
            <div className="flex justify-between col-span-2">
                <h1 className="text-5xl text-center col-span-2 font-bold">
                    {accessCode}
                </h1>
                <button className="btn btn-primary" onClick={handleIniciarJogo}>
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
                            <button className="btn btn-ghost">
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
