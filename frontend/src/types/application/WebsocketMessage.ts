import { GameState } from "../models/GameState";
import { Participante } from "../models/Participante";

export interface WebsocketMessage {
    message: {
        event: GameState;
        player: Participante;
    };
    error?: string;
}
