import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import Input from "../components/Input";

function NovaQuestao(): JSX.Element {
    const { register, control, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            enunciado: "",
            alternativas: [{ texto: "" }, { texto: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "alternativas",
        rules: {
            minLength: 2,
            maxLength: 4,
        },
    });

    function onSubmit(data: FieldValues) {
        console.log(data);
    }

    return (
        <div>
            <h1 className="text-2xl mb-4">Nova Questão</h1>

            <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("enunciado", { required: true })}
                    type="text"
                    placeholder="Enunciado da questão"
                    control={control}
                />
                <div className="divider" />
                <div className="grid grid-cols-1 gap-2">
                    <h2>Alternativas</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="form-control">
                            <div className="label">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    {...register(
                                        `alternativas.${index}.correta`,
                                    )}
                                />
                                <Input
                                    {...register(
                                        `alternativas.${index}.texto`,
                                        {
                                            required: true,
                                        },
                                    )}
                                    type="text"
                                    placeholder={`Alternativa ${index + 1}`}
                                    control={control}
                                />
                                <button
                                    className="btn btn-outline btn-error"
                                    type="button"
                                    onClick={() => remove(index)}
                                    disabled={fields.length <= 2}
                                >
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        className="btn w-full"
                        type="button"
                        disabled={fields.length >= 4}
                        onClick={() => append({ texto: "" })}
                    >
                        <i className="fa-solid fa-plus" /> Adicionar alternativa
                    </button>
                </div>
                <div className="divider" />
                <button type="submit" className="btn btn-primary w-full">
                    Salvar Questão
                </button>
            </form>
        </div>
    );
}

export default NovaQuestao;
