import express from "express";
import http from "http";
import cors from "cors";
import { Server, type Socket } from "socket.io";
import { Partida } from "./models/Partida";
import { Participante } from "./models/Participante";
import BaseService from "./services/BaseService";
import axiosInstance from "./services/AxiosInstance";
import { Alternativa } from "./models/Alternativa";
import { Questao } from "./models/Questao";

class GameServer {
	app: any;
	server: http.Server<
		typeof http.IncomingMessage,
		typeof http.ServerResponse
	>;
	io: any;
	partida?: Partida;
	service?: BaseService;

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
		this.service = undefined;
	}

	initialize() {
		this.partida = new Partida(this.generateGameCode());
		this.handleConnections();
		this.getQuestionario();
	}

	configureCors() {
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

	setService(service: BaseService) {
		this.service = service;
	}

	getQuestionario() {
		this.service
			?.getQuestionario()
			.then(({ data }) => {
				const questoes = data.questoes.map((q: any) => {
					const alternativas = q.alternativas.map((a: any) => {
						return new Alternativa(a.id, a.texto, a.cooreta);
					});

					return new Questao(q.id, q.enunciado, alternativas);
				});

				this.partida?.setQuestoes(questoes);
			})
			.catch((err) => {
				console.error("Erro ao coletar o questionário!");
				console.error(err);
			});
	}
}

export { GameServer };
