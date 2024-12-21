import {
    Questionario,
    QuestionarioResponse,
} from "../types/models/Questionario";
import GenericService from "./GenericService";

class QuestionarioService extends GenericService<
    Questionario | QuestionarioResponse
> {}

export default new QuestionarioService("questionario");
