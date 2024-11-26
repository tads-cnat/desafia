import { Questionario } from "../types/models/Questionario";

interface CardQuestionarioProps {
    questionario: Questionario;
}

function CardQuestionario(props: CardQuestionarioProps): JSX.Element {
    const { questionario } = props;
    const numeroQuestoes = questionario.questoes.length;
    return (
        <div className="card bg-base-100 w-96 shadow-xl h-full">
            <div className="card-body flex flex-col justify-between">
                <h2 className="card-title text-center">{questionario.nome}</h2>
                <div className="">
                    <p>
                        <strong>Questões:</strong> {numeroQuestoes}
                    </p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-ghost">Editar</button>
                        <button className="btn btn-primary">Jogar!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardQuestionario;
