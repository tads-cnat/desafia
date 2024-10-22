import React, { useState, useEffect, useRef } from "react";

interface Message {
    message: string;
}

interface QuizGameProps {
    gameId: string;
}

const Dashboard: React.FC<QuizGameProps> = ({ gameId = "123" }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Abrindo a conexão com o WebSocket
        socket.current = new WebSocket(
            `ws://localhost:8000/ws/game/${gameId}/`,
        );

        socket.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: data.message },
            ]);
        };

        socket.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket.current && inputMessage.trim() !== "") {
            socket.current.send(
                JSON.stringify({
                    message: inputMessage,
                }),
            );
            setInputMessage(""); // Limpa o campo de mensagem
        }
    };

    return (
        <div>
            <h1>Game Room: {gameId}</h1>

            <div
                style={{
                    border: "1px solid black",
                    padding: "10px",
                    maxHeight: "300px",
                    overflowY: "scroll",
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index}>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Dashboard;
