import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useGameStore } from "../../store/GameStore";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useAuth from "../../store/AuthStore";

function PedirApelido(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const { nickname, setNickname, gameId } = useGameStore();
    const { auth } = useAuth();
    const [socketUrl, setSocketUrl] = useState<string>(
        `ws://localhost:8000/ws/game/${gameId}/`,
    );
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            queryParams: {
                token: auth?.access as string,
            },
        },
    );

    function handleApelidoSubmission(values: FieldValues) {
        setNickname(values.nickname);
        sendJsonMessage({ action: "set_nickname", nickname: values.nickname });
    }

    useEffect(() => {
        console.log(lastJsonMessage);
    }, [lastJsonMessage]);

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

    return (
        <>
            <div className="w-screen h-screen flex flex-col m-auto justify-center items-center">
                <form
                    className="min-w-sm"
                    onSubmit={handleSubmit(handleApelidoSubmission)}
                >
                    <Input
                        {...register("nickname", { required: true })}
                        type="text"
                        label="Apelido"
                        placeholder="Insira seu apelido"
                        control={control}
                    />

                    <div className="flex justify-end mt-2">
                        <button className="btn btn-primary self-end">
                            Juntar-se
                        </button>
                    </div>
                </form>
                <div className="flex justify-end mt-2">
                    <button
                        className="btn btn-secondary self-end"
                        onClick={() => {
                            sendJsonMessage({
                                action: "set_answer",
                                resposta_id: 5,
                                questao_id: 2,
                            });
                        }}
                    >
                        Enviar resposta
                    </button>
                </div>
            </div>
        </>
    );
}

export default PedirApelido;
