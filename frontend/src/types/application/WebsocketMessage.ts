import { Participante } from "../models/Participante";

export interface WebsocketMessage {
    message: {
        event: string;
        player: Participante;
    };
}
