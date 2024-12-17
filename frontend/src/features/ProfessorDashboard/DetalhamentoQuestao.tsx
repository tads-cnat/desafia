import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestaoService from "../../services/QuestaoService";
import { toast } from "sonner";
import { Questao } from "../../types/models/Questao";
import SkeletonLoading from "../../components/SkeletonLoading";
import Input from "../../components/Input";

function DetalhamentoQuestao(): JSX.Element {
    const { id } = useParams();
    const [questao, setQuestao] = useState<Questao | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const questaoId = Number(id);
        if (questaoId) {
            setLoading(true);
            QuestaoService.get(questaoId)
                .then((res) => {
                    setQuestao(res);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <div>
            <h1>Detalhamento Questão</h1>

            {loading ? (
                <SkeletonLoading count={4} />
            ) : (
                <div className="border max-w-lg p-10">
                    <h2>{questao?.enunciado}</h2>
                    <Input />
                </div>
            )}
        </div>
    );
}

export default DetalhamentoQuestao;
