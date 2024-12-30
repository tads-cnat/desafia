import {
    Questionario,
    QuestionarioPayload,
} from "../types/models/Questionario";
import GenericService from "./GenericService";

class QuestionarioService extends GenericService<
    Questionario,
    QuestionarioPayload
> {}

export default new QuestionarioService("questionario");
