import { Categoria } from "./Categoria";
import { Questao } from "./Questao";

export interface Questionario {
    id: number;
    nome: string;
    descricao: string;
    categoria: Categoria;
    questoes: Questao[];
    created_at: Date;
    updated_at: Date;
}
