import { useFormContext } from "react-hook-form";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import CategoriaService from "../../services/CategoriaService";
import { Categoria } from "../../types/models/Categoria";
import { toast } from "sonner";

function InformacoesBasicasQuestionario(): JSX.Element {
    const { register, control } = useFormContext();
    const [categorias, setCategorias] = useState<Categoria[]>();
    useEffect(() => {
        CategoriaService.getAll()
            .then((categorias) => {
                setCategorias(categorias.items);
            })
            .catch((error) => {
                toast.error("Erro ao carregar categorias");
            });
    }, []);

    return (
        <div className="grid gap-4">
            <Input
                {...register("nome", { required: true })}
                type="text"
                placeholder="Título do questionário"
                control={control}
            />

            <textarea
                className="textarea textarea-bordered"
                placeholder="Descrição do questionário"
                {...register("descricao")}
            />

            <div className="flex gap-4 items-center">
                <select
                    className="select select-bordered w-full max-w-xs"
                    {...register("categoria")}
                >
                    <option disabled selected>
                        Selecione uma categoria
                    </option>
                    {categorias?.map((categoria) => (
                        <option key={categoria.id}>{categoria.nome}</option>
                    ))}
                </select>
                <button className="btn btn-circle btn-sm" type="button">
                    <i className="fas fa-plus" />
                </button>
            </div>
        </div>
    );
}

export default InformacoesBasicasQuestionario;
