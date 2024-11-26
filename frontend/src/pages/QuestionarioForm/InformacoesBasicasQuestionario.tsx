import { useFormContext } from "react-hook-form";
import Input from "../../components/Input";

function InformacoesBasicasQuestionario(): JSX.Element {
    const { register, control } = useFormContext();

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
                        Categoria
                    </option>
                    <option>Categoria 1</option>
                    <option>Categoria 2</option>
                    <option>Categoria 3</option>
                    <option>Categoria 4</option>
                </select>
                <button className="btn btn-circle btn-sm" type="button">
                    <i className="fas fa-plus" />
                </button>
            </div>
        </div>
    );
}

export default InformacoesBasicasQuestionario;
