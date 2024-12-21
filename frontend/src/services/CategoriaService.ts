import { Categoria, CategoriaResponse } from "../types/models/Categoria";
import GenericService from "./GenericService";

class CategoriaService extends GenericService<Categoria | CategoriaResponse> {}

export default new CategoriaService("categoria");
