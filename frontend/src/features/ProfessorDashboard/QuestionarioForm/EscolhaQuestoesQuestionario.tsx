import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Questao } from "../../../types/models/Questao";
import QuestaoService from "../../../services/QuestaoService";
import Pagination from "../../../components/Pagination";
import { PaginationParams } from "../../../types/application/Pagination";

function EscolhaQuestoesQuestionario(): JSX.Element {
    const { register, control, setValue } = useFormContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [count, setCount] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

    const [pagination, setPagination] = useState<PaginationParams>({
        limit: 10,
        offset: 0,
    });

    function loadTable() {
        setLoading(true);

        const filters = { ...pagination, q: query };

        QuestaoService.getAll(filters)
            .then((response) => {
                setCount(response.count);
                setQuestoes(response.items);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    }

    function selectQuestion(id: number) {
        if (selectedQuestions.includes(id)) {
            setSelectedQuestions(
                selectedQuestions.filter((item) => item !== id),
            );
        } else {
            setSelectedQuestions([...selectedQuestions, id]);
        }
    }

    useEffect(() => {
        void loadTable();
    }, [pagination, query]);

    useEffect(() => {
        setValue("questoes_id", selectedQuestions);
    }, [selectedQuestions]);

    function openNovaQuestaoModal() {
        const modal = document.getElementById("nova_questao_modal");
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }
    }

    return (
        <>
            <div className="flex gap-2 justify-between">
                <label className="input flex items-center w-full gap-2">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input
                        type="text"
                        className="grow"
                        placeholder="Pesquise pelas suas questões"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
                <button
                    className="btn"
                    type="button"
                    onClick={openNovaQuestaoModal}
                >
                    Nova questão
                </button>
            </div>
            <div className="flex flex-col items-center gap-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {questoes.map((questao) => {
                            return (
                                <tr key={questao.id}>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={selectedQuestions.includes(
                                                    questao.id ?? -1,
                                                )}
                                                onClick={() => {
                                                    selectQuestion(
                                                        questao.id ?? 0,
                                                    );
                                                }}
                                                onChange={() => {}}
                                            />
                                        </label>
                                    </th>
                                    <td>{questao.enunciado}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-circle">
                                            <i className="fas fa-eye" />
                                        </button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination count={count} setPagination={setPagination} />
            </div>
        </>
    );
}

export default EscolhaQuestoesQuestionario;
