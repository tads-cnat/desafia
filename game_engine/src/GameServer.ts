import express from "express";
import http from "http";
import cors from "cors";
import { Server, type Socket } from "socket.io";
import { Partida } from "./models/Partida";
import { Organizador } from "./models/Organizador";
import { Participante } from "./models/Participante";

class GameServer {
	app: any;
	server: http.Server<
		typeof http.IncomingMessage,
		typeof http.ServerResponse
	>;
	io: any;
	partida?: Partida;

	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.io = new Server(this.server, {
			cors: {
				origin: "*",
				methods: ["GET", "POST"],
			},
		});

		this.partida = undefined;
	}

	initialize() {
		this.partida = new Partida(
			new Organizador("Teste"),
			this.generateGameCode()
		);
		this.handleConnections();
		this.app.use(cors());
	}

	handleConnections() {
		this.io.on("connection", (socket: Socket) => {
			console.log(`User connected: ${socket.id}`);

			socket.on("joinGame", (data) => {
				this.handleJoinGame(socket, data);
			});

			socket.on("answerQuestion", (data) => {
				this.handleAnswerQuestion(socket, data);
			});

			socket.on("disconnect", () => {
				console.log(`User disconnected: ${socket.id}`);
			});
		});
	}

	startListening() {
		const port = process.env.PORT || 3000;
		this.server.listen(port, () => {
			console.log(`Ouvindo em: ${port}`);
		});
	}

	handleJoinGame(socket: any, data: any) {
		const player = new Participante(data.nome);
		this.partida?.joinPlayer(player);
		socket.send(`${player.nome} juntou-se ao jogo`);
	}

	handleAnswerQuestion(socket: any, data: any) {
		throw new Error("Function not implemented.");
	}

	generateGameCode(): string {
		return Math.random().toString(36).substring(2, 6).toUpperCase();
	}
}

export { GameServer };
