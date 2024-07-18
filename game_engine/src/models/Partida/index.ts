import { Organizador } from "../Organizador";
import { Participante } from "../Participante";
import { Questao } from "../Questao";

class Partida {
	jogadores: Participante[];
	organizador?: Organizador;
	codigo: string;
	questaoIndice: number;
	questoes: Questao[];

	constructor(codigo: string) {
		this.jogadores = [];
		this.organizador = undefined;
		this.codigo = codigo;
		this.questaoIndice = 0;
		this.questoes = [];
	}

	joinPlayer(jogador: Participante) {
		console.log(`${jogador.nome} juntou-se ao jogo!`);
		this.jogadores.push(jogador);
	}

	getCodigo(): string {
		return this.codigo;
	}

	setQuestoes(questoes: Questao[]): void {
		this.questoes = questoes;
	}
}

export { Partida };
