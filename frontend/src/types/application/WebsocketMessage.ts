import { GameState } from "../models/GameState";
import { Participante } from "../models/Participante";

export interface WebsocketMessage {
    message: {
        event: GameState;
        player: Participante;
        target: string;
        data?: unknown;
        pontuacao?: number;
        correta?: boolean;
    };
    error?: string;
}
