import { io, Socket } from "socket.io-client";

class WebSocketSingleton {
    private static instance: Socket;

    private constructor() {}

    public static getInstance(serverUrl: string): Socket {
        if (!WebSocketSingleton.instance) {
            WebSocketSingleton.instance = io(serverUrl);
        }
        return WebSocketSingleton.instance;
    }
}

export default WebSocketSingleton;
