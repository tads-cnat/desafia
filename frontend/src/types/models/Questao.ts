import { Alternativa } from "./Alternativa";

export interface Questao {
    id?: number;
    enunciado: string;
    alternativas?: Alternativa[];
    created_at?: Date;
    updated_at?: Date;
}

export interface QuestaoAPI {
    id?: number;
    enunciado: string;
    alternativas_ids?: number[];
}
