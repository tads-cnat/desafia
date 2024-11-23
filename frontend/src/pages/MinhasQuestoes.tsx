import { useEffect, useState } from "react";
import QuestaoService from "../services/QuestaoService";
import { Questao } from "../types/models/Questao";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SkeletonLoading from "../components/SkeletonLoading";

function MinhasQuestoes(): JSX.Element {
    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        QuestaoService.getAll()
            .then((response) => {
                setQuestoes(response.items);
            })
            .catch((error) => {})
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="flex justify-between w-100">
                <h1 className="text-2xl">Minhas Questões</h1>
                <Link to="/nova-questao" className="btn btn-primary">
                    <i className="fa-solid fa-plus" /> Nova Questão
                </Link>
            </div>
            {loading ? (
                <SkeletonLoading count={1} />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Enunciado</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {questoes.map((questao) => {
                            return (
                                <tr key={questao.id} className="hover">
                                    <td>{questao.enunciado}</td>
                                    <td className="cursor-pointer">
                                        <i className="fa-solid fa-caret-right" />
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

export default MinhasQuestoes;
