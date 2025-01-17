import { Alternativa, AlternativaPayload } from "../types/models/Alternativa";
import GenericService from "./GenericService";

class AlternativaService extends GenericService<
    Alternativa,
    AlternativaPayload
> {}

export default new AlternativaService("alternativa");
