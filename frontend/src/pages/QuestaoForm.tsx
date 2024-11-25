import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import Input from "../components/Input";
import { Questao } from "../types/models/Questao";
import { useEffect, useState } from "react";
import QuestaoService from "../services/QuestaoService";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function QuestaoForm(): JSX.Element {
    const { register, control, handleSubmit, setValue } = useForm<FieldValues>({
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
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState<{ message: string } | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            QuestaoService.get(Number(id))
                .then((questao) => {
                    const { enunciado, alternativas } = questao;
                    setValue("enunciado", enunciado);
                    setValue("alternativas", alternativas);
                })
                .catch(() => {
                    toast.error("Erro ao carregar a questão");
                    navigate("/minhas-questoes");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    function onSubmit(data: FieldValues) {
        const { enunciado, alternativas } = data as Questao;

        const atLeastOneCorrect = alternativas?.some((a) => a.correta);
        if (!atLeastOneCorrect) {
            toast.error("Selecione pelo menos uma alternativa como correta");
            return;
        }
        const saveQuestao = id
            ? QuestaoService.put(Number(id), { enunciado, alternativas })
            : QuestaoService.post({ enunciado, alternativas });

        saveQuestao
            .then(() => {
                toast.success("Questão salva com sucesso");
                navigate("/minhas-questoes");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erro ao salvar questão");
            });
    }

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <>
            <form
                className="max-w-sm mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl my-4">
                    {id ? " Editar" : " Nova"} Questão
                </h1>

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
                    <div className="divider" />
                    {id && (
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn w-full"
                        >
                            Cancelar edição
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary w-full">
                        Salvar Questão
                    </button>
                </div>
            </form>
        </>
    );
}

export default QuestaoForm;
