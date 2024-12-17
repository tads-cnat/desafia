import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import InformacoesBasicasQuestionario from "./InformacoesBasicasQuestionario";
import EscolhaQuestoesQuestionario from "./EscolhaQuestoesQuestionario";
import { toast } from "sonner";
import QuestionarioService from "../../../services/QuestionarioService";
import { useNavigate } from "react-router-dom";
import { QuestionarioAPI } from "../../../types/models/Questionario";
import NovaCategoriaModal from "../../../components/NovaCategoriaModal";
import QuestaoForm from "../QuestaoForm";
import { useModal } from "../../../hooks/useModal";

function QuestionarioForm(): JSX.Element {
    const methods = useForm();
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();
    const { close } = useModal();

    function submitForm(data: FieldValues): void {
        QuestionarioService.post(data as QuestionarioAPI)
            .then((res) => {
                console.log(res);
                toast.success("Questionário criado com sucesso!");
                navigate("/meus-questionarios");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Erro ao criar questionário");
            });
    }

    return (
        <>
            <form
                className="max-w-screen-sm mx-auto flex flex-col justify-between h-full"
                onSubmit={methods.handleSubmit(submitForm)}
            >
                <div>
                    <h1 className="text-2xl mb-4">Novo Questionário</h1>
                    <FormProvider {...methods}>
                        {step === 1 && <InformacoesBasicasQuestionario />}
                        {step === 2 && <EscolhaQuestoesQuestionario />}
                    </FormProvider>
                </div>

                <div className="w-100 flex justify-end">
                    <div className="flex gap-2">
                        <button
                            className="btn"
                            type="button"
                            disabled={step === 1}
                            onClick={() => setStep(step - 1)}
                        >
                            <i className="fas fa-arrow-left" />
                            Voltar
                        </button>

                        {step !== 2 ? (
                            <button
                                className={"btn btn-info"}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(step + 1);
                                }}
                                disabled={step === 2}
                            >
                                Próximo
                                <i className="fas fa-arrow-right" />
                            </button>
                        ) : (
                            <button className={"btn btn-success"} type="submit">
                                Concluir
                            </button>
                        )}
                    </div>
                </div>
            </form>
            <dialog id="nova_categoria_modal" className="modal">
                <NovaCategoriaModal />
            </dialog>
            <dialog id="nova_questao_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <QuestaoForm
                        redirect={false}
                        onSubmit={() => {
                            close("nova_questao_modal");
                        }}
                    />
                </div>
            </dialog>
        </>
    );
}

export default QuestionarioForm;
