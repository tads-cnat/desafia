import { useEffect, useState } from "react";
import QuestionariosService from "../services/QuestionarioService";
import { Questionario } from "../types/models/Questionario";
import SkeletonLoading from "../components/SkeletonLoading";
import { Link } from "react-router-dom";

function MeusQuestionarios(): JSX.Element {
    const [questionarios, setQuestionarios] = useState<Questionario[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        QuestionariosService.getAll()
            .then((response) => {
                const { count, items } = response;
                console.log(count, items);
                setQuestionarios(items);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl ml-4">Meus questionários</h1>
                <Link to="/novo-questionario" className="btn">
                    <i className="fa-solid fa-plus" /> Novo Questionário
                </Link>
            </div>
            {loading ? (
                <SkeletonLoading count={5} />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título do questionario</th>
                            <th>Número de questões</th>
                            <th>Categoria</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {questionarios?.map((questionario) => {
                            return (
                                <tr key={questionario.id} className="hover">
                                    <td>{questionario.nome}</td>
                                    <td>{questionario.questoes.length}</td>
                                    <td>{questionario.categoria.nome}</td>
                                    <td>
                                        <div className="grid grid-cols-1">
                                            <button className="btn btn-sm">
                                                <i className="fa-solid fa-play" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default MeusQuestionarios;
