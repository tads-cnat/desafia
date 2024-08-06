import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

function Dashboard() {
    const { register, handleSubmit } = useForm();
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [nomeJogador, setNomeJogador] = useState<string>("");

    function conectar(data: FieldValues) {
        const { address } = data;
        const newSocket = io(address);

        newSocket.on("connect", () => {
            console.log("Conectado ao servidor");
        });

        newSocket.on("disconnect", () => {
            console.log("Desconectado do servidor");
        });

        newSocket.on("connect_error", (err) => {
            console.error("Erro de conexão:", err);
        });

        setSocket(newSocket);
    }

    function juntar() {
        socket?.emit("");
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <form
                onSubmit={handleSubmit(conectar)}
                className="border-solid border rounded-lg p-5"
            >
                <label className="form-control w-full max-w-xs mb-5">
                    <div className="label">
                        <span className="label-text">Endereço do servidor</span>
                    </div>
                    <input
                        type="text"
                        placeholder="127.0.0.1:3000"
                        className="input input-bordered w-full max-w-xs"
                        {...register("address")}
                    />
                </label>
                <div className="flex w-full justify-end">
                    <button type="submit" className="btn btn-primary">
                        Conectar
                    </button>
                </div>
            </form>
            {socket && (
                <div className="mt-5 border-solid border rounded-lg p-5">
                    <label className="form-control w-full max-w-xs mb-3">
                        <div className="label">
                            <span className="label-text">Nome</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Insira o nome do jogador aqui"
                            className="input input-bordered w-full max-w-xs"
                            value={nomeJogador}
                            onChange={(e) => setNomeJogador(e.target.value)}
                        />
                    </label>

                    <div className="flex w-full justify-end">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={juntar}
                        >
                            Juntar-se
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
