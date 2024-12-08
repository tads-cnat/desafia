import { Categoria, CategoriaAPI } from "../types/models/Categoria";
import GenericService from "./GenericService";

class CategoriaService extends GenericService<Categoria | CategoriaAPI> {}

export default new CategoriaService("categoria");
