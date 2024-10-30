import { Questionario } from "../types/models/Questionario";
import GenericService from "./GenericService";

class QuestionarioService extends GenericService<Questionario> {}

export default new QuestionarioService("questionario");
