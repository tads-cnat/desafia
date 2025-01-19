import axios from "../api/axios";
import { PartidaPayload, Partida } from "../types/models/Partida";
import GenericService from "./GenericService";

class PartidaService extends GenericService<Partida, PartidaPayload> {
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

    async participantes(partidaId: string) {
        const res = await axios.get(`partida/${partidaId}/participantes/`);
        return res;
    }
    
    async podio(partidaId: string) {
        const res = await axios.get(`partida/${partidaId}/podio/`);
        return res;
    }
}

export default new PartidaService("partida");
