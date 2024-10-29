import { useEffect } from "react";
import QuestionariosService from "../services/QuestionarioService";

function MeusQuestionarios(): JSX.Element {
    useEffect(() => {
        QuestionariosService.getAll().then((response) => {
            console.log(response);
        });
    }, []);

    return (
        <>
            <div className="min-w-full h-screen"></div>
        </>
    );
}

export default MeusQuestionarios;
