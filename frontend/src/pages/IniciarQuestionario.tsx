import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionarioService from "../services/QuestionarioService";
import { Questionario } from "../types/models/Questionario";
import { formatarData } from "../utils/dateUtils";

function IniciarQuestionario(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [questionario, setQuestionario] = useState<Questionario>();

    useEffect(() => {
        if (id) {
            QuestionarioService.get(Number(id))
                .then((response) => {
                    setQuestionario(response as Questionario);
                })
                .catch((error) => {});
        }
    }, [id]);
    return (
        <div className="my-5 grid gap-5">
            <div>
                <h1 className="text-2xl font-bold">{questionario?.nome}</h1>
                <h2 className="font-light text-sm mb-2">{`Criado por você em ${formatarData(questionario?.created_at)}`}</h2>
                <h2>{questionario?.descricao}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 px-60">
                <div className="card bg-base-200 rounded-box grid h-20 flex-grow place-items-center">
                    {`${questionario?.questoes.length} questões`}
                </div>
                <div className="card bg-base-200 rounded-box grid h-20 flex-grow place-items-center">
                    0 vezes jogado
                </div>
            </div>
            <div className="divider" />
            <div className="flex justify-center gap-2">
                <button className="btn btn-ghost">Editar questionário</button>
                <button className="btn btn-primary">Iniciar Jogo</button>
            </div>
        </div>
    );
}

export default IniciarQuestionario;
