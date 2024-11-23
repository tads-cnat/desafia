import { FieldValues, set, useFieldArray, useForm } from "react-hook-form";
import Input from "../components/Input";
import { Questao } from "../types/models/Questao";
import { useEffect, useState } from "react";
import QuestaoService from "../services/QuestaoService";
import Alert from "../components/Alert";

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

    const [error, setError] = useState<{ message: string } | undefined>(
        undefined,
    );

    function onSubmit(data: FieldValues) {
        const { enunciado, alternativas } = data as Questao;

        const atLeastOneCorrect = alternativas?.some((a) => a.correta);
        if (!atLeastOneCorrect) {
            setError({
                message: "Selecione pelo menos uma alternativa como correta",
            });
            return;
        }

        QuestaoService.post({ enunciado, alternativas })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log("Erro ao salvar questão");
            });
    }

    return (
        <div>
            <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                {/* <Alert message={} type="error" /> */}
                <h1 className="text-2xl my-4">Nova Questão</h1>
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
                                    onChange={() => {
                                        setError(undefined);
                                    }}
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
                    {error && (
                        <p className="text-error text-sm">{error.message}</p>
                    )}
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
