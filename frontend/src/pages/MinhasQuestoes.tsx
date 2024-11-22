import { useEffect, useState } from "react";
import QuestaoService from "../services/QuestaoService";
import { Questao } from "../types/models/Questao";

function MinhasQuestoes(): JSX.Element {
    const [questoes, setQuestoes] = useState<Questao[]>([]);

    useEffect(() => {
        QuestaoService.getAll()
            .then((response) => {
                setQuestoes(response.items);
            })
            .catch((error) => {});
    }, []);

    return (
        <div className="min-w-full h-screen">
            {questoes.map((questao) => {
                return <p key={questao.id}>{questao.enunciado}</p>;
            })}
        </div>
    );
}

export default MinhasQuestoes;
