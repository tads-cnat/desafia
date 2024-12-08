import { Categoria } from "../types/models/Categoria";
import GenericService from "./GenericService";

class CategoriaService extends GenericService<Categoria> {}

export default new CategoriaService("categoria");
