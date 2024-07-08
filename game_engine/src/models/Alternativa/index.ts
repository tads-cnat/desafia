class Alternativa {
	id: number;
	texto: string;
	correta: boolean;

	constructor(id: number, texto: string, correta: boolean) {
		this.id = id;
		this.texto = texto;
		this.correta = correta;
	}

	isCorreta(): boolean {
		return this.correta;
	}

	getTexto(): string {
		return this.texto;
	}
}

export { Alternativa };
