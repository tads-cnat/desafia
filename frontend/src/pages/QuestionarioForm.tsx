import { useForm } from "react-hook-form";
import Input from "../components/Input";

/* export interface Questionario {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    questoes: Questao[];
    created_at: Date;
    updated_at: Date;
}
 */

function QuestionarioForm(): JSX.Element {
    const { control, register } = useForm();

    return (
        <>
            <form className="max-w-screen-sm mx-auto">
                <h1 className="text-2xl my-4">Novo Questionário</h1>

                <Input
                    {...register("titulo", { required: true })}
                    type="text"
                    placeholder="Questionario"
                    control={control}
                />

                <textarea
                    className="textarea textarea-bordered"
                    placeholder="Bio"
                />

                <div className="divider" />
            </form>
        </>
    );
}

export default QuestionarioForm;
