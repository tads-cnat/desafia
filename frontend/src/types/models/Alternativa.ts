export interface Alternativa {
    id?: number;
    texto: string;
    correta: boolean;
}

export interface AlternativaPayload extends Alternativa {}
