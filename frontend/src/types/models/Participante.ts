import { Partida } from "./Partida";

export interface Participante {
    id?: number;
    nome: string;
    partida?: Partida;
}

export interface ParticipantePayload extends Participante {}
