import { Questionario } from "./Questionario";

export interface Partida {
    questionario_id: number;
}

export interface PartidaResponse {
    id: string;
    questionario: Questionario;
    codigo_acesso: string;
    ativa: boolean;
}
