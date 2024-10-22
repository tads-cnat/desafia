import { useState } from "react";
import Esperando from "../Esperando";
import Escolhas from "../Escolhas";
import ResultadoQuestao from "../ResultadoQuestao";

type Estado = "em_espera" | "respondendo" | "resultado";

function PartidaJogador(): JSX.Element {
    const [estado, setEstado] = useState<Estado>("em_espera");

    function enviarMensagem(mensagem: string) {
        console.log(mensagem);
    }

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
