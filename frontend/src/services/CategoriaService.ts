import { Categoria, CategoriaPayload } from "../types/models/Categoria";
import GenericService from "./GenericService";

class CategoriaService extends GenericService<Categoria, CategoriaPayload> {}

export default new CategoriaService("categoria");
