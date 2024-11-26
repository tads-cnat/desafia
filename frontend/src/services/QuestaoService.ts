import { axiosPrivate } from "../api/axios";
import { Alternativa } from "../types/models/Alternativa";
import { Questao } from "../types/models/Questao";
import GenericService from "./GenericService";

class QuestaoService extends GenericService<Questao> {
    async cadastrarAlternativa(id: number, data: Alternativa) {
        const response = await axiosPrivate.post(
            `${this.serviceUrl}/${id}/alternativa`,
            data,
        );
        return response.data;
    }
}

export default new QuestaoService("questao");
