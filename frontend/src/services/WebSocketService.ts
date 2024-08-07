import WebSocketSingleton from "./WebSocketSingleton";
import { Socket } from "socket.io-client";

class WebSocketService {
    private static instance: WebSocketService;
    private socket: Socket;

    public constructor(serverUrl: string) {
        this.socket = WebSocketSingleton.getInstance(serverUrl);

        this.socket.on("connect", () => {
            console.log("Conectado ao servidor WebSocket");
        });

        this.socket.on("disconnect", () => {
            console.log("Desconectado do servidor WebSocket");
        });
    }

    public static getInstance(serverUrl: string): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService(serverUrl);
        }
        return WebSocketService.instance;
    }

    public emitir(oque: string, conteudo: unknown) {
        this.socket.emit(oque, conteudo);
    }

    public quando(oque: string, fazer: (data: unknown) => void) {
        this.socket.on(oque, fazer);
    }
}

export default WebSocketService;
