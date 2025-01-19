import { Partida } from "./Partida";

export interface Participante {
    id?: number;
    nome: string;
    partida?: Partida;
    pontuacao_total: number;
}

export interface ParticipantePayload extends Participante {}
