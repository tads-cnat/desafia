import { useEffect, useState } from "react";
import QuestionariosService from "../services/QuestionarioService";
import { Questionario } from "../types/models/Questionario";

function MeusQuestionarios(): JSX.Element {
    const [questionarios, setQuestionarios] = useState<Questionario[]>();

    useEffect(() => {
        QuestionariosService.getAll().then((response) => {
            const { count, items } = response;
            setQuestionarios(items);
        });
    }, []);

    return (
        <>
            <div className="min-w-full h-screen">
                {questionarios?.map((questionario, key) => {
                    return <p key={key}>{questionario.nome}</p>;
                })}
            </div>
        </>
    );
}

export default MeusQuestionarios;
