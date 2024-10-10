// src/services/WebSocketService.ts

export class WebSocketService {
    private websocket: WebSocket | null = null;

    connect(address: string): void {
        try {
            this.websocket = new WebSocket(`ws://${address}`);
            this.websocket.onopen = () => {
                console.log(
                    `Conectado ao servidor WebSocket em ws://${address}`,
                );
            };
            this.websocket.onmessage = (event) => {
                console.log("Mensagem recebida do servidor:", event.data);
            };
            this.websocket.onclose = () => {
                console.log("Conexão WebSocket fechada.");
            };
            this.websocket.onerror = (error) => {
                console.error("Erro na conexão WebSocket:", error);
            };
        } catch (error) {
            console.error("Erro ao conectar:", error);
        }
    }

    disconnect(): void {
        if (this.websocket) {
            this.websocket.close();
        }
    }

    sendMessage(message: string): void {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error("WebSocket não está conectado.");
        }
    }
}
