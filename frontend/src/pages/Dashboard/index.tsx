import { useForm } from "react-hook-form";
import { useState } from "react";
import WebsocketService from "../../data/WebSocketService";

function Dashboard() {
    const { register, handleSubmit } = useForm();
    const [connected, setConnected] = useState(false);

    function conectar(data) {
        const { address } = data;
        WebsocketService.connect(address, handleMessage)
            .then(() => {
                setConnected(true);
                console.log("Conexão estabelecida com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao estabelecer conexão:", error);
            });
    }

    function handleMessage(message) {
        console.log("Mensagem do servidor:", message);
    }

    function disconnect() {
        WebsocketService.close();
        setConnected(false);
        console.log("Desconectado do servidor.");
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
                        {connected ? "Conectado" : "Conectar"}
                    </button>
                </div>
            </form>
            {connected && (
                <div className="mt-5">
                    <button onClick={disconnect} className="btn btn-secondary">
                        Desconectar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
