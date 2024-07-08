class Participante {
	nome: string;
	pontuacao: number;
	posicao: number;

	constructor(nickname: string) {
		this.nome = nickname;
		this.pontuacao = -1;
		this.posicao = -1;
	}
}

export { Participante };
