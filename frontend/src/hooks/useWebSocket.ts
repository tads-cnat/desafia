// src/hooks/useWebSocket.ts
import { useState } from "react";
import { WebSocketService } from "../data/WebSocketService";

export const useWebSocket = () => {
    const [webSocketService] = useState(new WebSocketService());

    const connectWebSocket = (address: string) => {
        webSocketService.connect(address);
    };

    const disconnectWebSocket = () => {
        webSocketService.disconnect();
    };

    const sendMessage = (message: string) => {
        webSocketService.sendMessage(message);
    };

    return {
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
    };
};
