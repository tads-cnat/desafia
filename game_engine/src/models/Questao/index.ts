import { Alternativa } from "../Alternativa";

class Questao {
	id: number;
	enunciado: string;
	alternativas: Alternativa[];

	constructor(id: number, enunciado: string, alternativas: Alternativa[]) {
		this.id = id;
		this.enunciado = enunciado;
		this.alternativas = alternativas;
	}
}

export { Questao };
