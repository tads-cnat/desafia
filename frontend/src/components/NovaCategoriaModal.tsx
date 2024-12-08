import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import CategoriaService from "../services/CategoriaService";
import { toast } from "sonner";
import { CategoriaAPI } from "../types/models/Categoria";
import { useReload } from "../hooks/useReload";

function NovaCategoriaModal(): JSX.Element {
    const { register, control, handleSubmit } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const { forceReload } = useReload();

    function cadastrarCategoria(data: FieldValues) {
        setLoading(true);
        CategoriaService.post(data as CategoriaAPI)
            .then((res) => {
                console.log(res);
                toast.success("Categoria cadastrada com sucesso!");
                closeModal();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erro ao cadastrar categoria");
            })
            .finally(() => {
                setLoading(false);
                forceReload();
            });
    }

    function closeModal() {
        const modal = document.getElementById("nova_categoria_modal");
        if (modal) {
            (modal as HTMLDialogElement).close();
        }
    }

    return (
        <>
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">
                    Cadastre uma nova categoria!
                </h3>
                <form onSubmit={handleSubmit(cadastrarCategoria)}>
                    <div className="pt-4">
                        <Input
                            {...register("nome", { required: true })}
                            type="text"
                            placeholder="Nome da categoria"
                            control={control}
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? (
                                <span className="loading loading-spinner loading-xs" />
                            ) : (
                                <button className="btn btn-primary">
                                    Cadastrar
                                </button>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NovaCategoriaModal;
