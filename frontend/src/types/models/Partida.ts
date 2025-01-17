import { Questionario } from "./Questionario";

export interface PartidaPayload {
    questionario_id: number;
}

export interface Partida {
    id: string;
    questionario: Questionario;
    codigo_acesso: string;
    ativa: boolean;
}
