import { useFormContext } from "react-hook-form";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import CategoriaService from "../../services/CategoriaService";
import { Categoria } from "../../types/models/Categoria";
import { toast } from "sonner";
import { useReload } from "../../hooks/useReload";

function InformacoesBasicasQuestionario(): JSX.Element {
    const { register, control } = useFormContext();
    const [categorias, setCategorias] = useState<Categoria[]>();
    const { reload } = useReload();
    useEffect(() => {
        CategoriaService.getAll()
            .then((categorias) => {
                setCategorias(categorias.items);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erro ao carregar categorias");
            });
    }, [reload]);

    function openModal() {
        const modal = document.getElementById("nova_categoria_modal");
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    }

    return (
        <>
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
                        {...register("categoria_id")}
                        defaultValue={-1}
                    >
                        <option disabled value={-1}>
                            Selecione uma categoria
                        </option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-circle btn-sm"
                        type="button"
                        onClick={openModal}
                    >
                        <i className="fas fa-plus" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default InformacoesBasicasQuestionario;
