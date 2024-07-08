import { Organizador } from "../Organizador";
import { Participante } from "../Participante";

class Partida {
	jogadores: Participante[];
	organizador: Organizador;
	codigo: string;
	questaoIndice: number;
	questoes: Questao[];

	constructor(
		organizador: Organizador,
		codigo: string,
		questoes: Questoes[]
	) {
		this.jogadores = [];
		this.organizador = organizador;
		this.codigo = codigo;
		this.questaoIndice = 0;
		this.questoes = questoes;
	}

	joinPlayer(jogador: Participante) {
		console.log(`${jogador.nome} juntou-se ao jogo!`);
		this.jogadores.push(jogador);
	}

	getCodigo(): string {
		return this.codigo;
	}
}

export { Partida };
