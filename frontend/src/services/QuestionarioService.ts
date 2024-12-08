import { Questionario, QuestionarioAPI } from "../types/models/Questionario";
import GenericService from "./GenericService";

class QuestionarioService extends GenericService<
    Questionario | QuestionarioAPI
> {}

export default new QuestionarioService("questionario");
