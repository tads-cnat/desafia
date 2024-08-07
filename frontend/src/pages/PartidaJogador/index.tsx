import { useEffect, useState } from "react";
import Esperando from "../Esperando";
import Escolhas from "../Escolhas";
import ResultadoQuestao from "../ResultadoQuestao";
import WebSocketService from "../../services/WebSocketService";

type Estado = "em_espera" | "respondendo" | "resultado";

function PartidaJogador(): JSX.Element {
    const [estado, setEstado] = useState<Estado>("em_espera");
    const socket = new WebSocketService("http://localhost:3000");

    function enviarMensagem(mensagem: string) {
        console.log(mensagem);
        socket.emitir("mudar_estado", mensagem);
    }

    socket.quando("mudar_estado", (data) => {
        console.log("Alguem trocou o estado para: " + data);
    });

    return (
        <>
            {(() => {
                switch (estado) {
                    case "em_espera":
                        return <Esperando />;

                    case "respondendo":
                        return <Escolhas />;

                    case "resultado":
                        return <ResultadoQuestao />;
                }
            })()}

            <div className="min-w-screen border flex justify-center gap-2 p-5">
                <button
                    className="btn btn-primary"
                    onClick={() => enviarMensagem("em_espera")}
                >
                    Em espera
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => enviarMensagem("respondendo")}
                >
                    Respondendo
                </button>
                <button
                    className="btn btn-accent"
                    onClick={() => enviarMensagem("resultado")}
                >
                    Resultado
                </button>
            </div>
        </>
    );
}

export default PartidaJogador;
