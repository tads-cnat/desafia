import { Alternativa } from "./Alternativa";

export interface Questao {
    id?: number;
    enunciado: string;
    alternativas?: Alternativa[];
    tempo_para_resposta?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface QuestaoPayload {
    id?: number;
    enunciado: string;
    tempo_para_resposta?: number;
    alternativas?: Alternativa[];
}
