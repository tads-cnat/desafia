import { Alternativa } from "../types/models/Alternativa";
import GenericService from "./GenericService";

class AlternativaService extends GenericService<Alternativa> {}

export default new AlternativaService("alternativa");
