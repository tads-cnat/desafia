import { Questao } from "./Questao";

export interface Questionario {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    questoes: Questao[];
    created_at: Date;
    updated_at: Date;
}
