export interface Alternativa {
    id?: number;
    texto: string;
    correta: boolean;
}

export interface AlternativaAPI extends Alternativa {}
