import { Partida } from "../types/models/Partida";
import GenericService from "./GenericService";

class PartidaService extends GenericService<Partida> {}

export default new PartidaService("partida");
