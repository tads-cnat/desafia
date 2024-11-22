import { Questao } from "../types/models/Questao";
import GenericService from "./GenericService";

class QuestaoService extends GenericService<Questao> {}

export default new QuestaoService("questao");
