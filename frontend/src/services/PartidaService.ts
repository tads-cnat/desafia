import axios from "../api/axios";
import { Partida, PartidaResponse } from "../types/models/Partida";
import GenericService from "./GenericService";

class PartidaService extends GenericService<Partida | PartidaResponse> {
    async entrar(codigoAcesso: string) {
        const res = await axios.get(`partida/entrar/${codigoAcesso}/`);
        return res;
    }

    async reservarNome(partidaId: string, nome: string) {
        const res = await axios.post(`partida/${partidaId}/participante/`, {
            nome,
        });
        return res;
    }
}

export default new PartidaService("partida");
