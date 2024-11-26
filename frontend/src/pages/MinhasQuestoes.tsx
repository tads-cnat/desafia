import { useEffect, useState } from "react";
import QuestaoService from "../services/QuestaoService";
import { Questao } from "../types/models/Questao";
import { Link } from "react-router-dom";
import SkeletonLoading from "../components/SkeletonLoading";
import { toast } from "sonner";

function MinhasQuestoes(): JSX.Element {
    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [questao, setQuestao] = useState<Questao | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        QuestaoService.getAll()
            .then((response) => {
                setQuestoes(response.items);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function openDeleteModal(id: number) {
        const modal = document.getElementById("excluir_questao_modal");
        setLoadingModal(true);
        if (modal) {
            (modal as HTMLDialogElement).showModal();
        }

        QuestaoService.get(id)
            .then((response) => {
                setQuestao(response);
            })
            .catch(() => {
                setQuestao(undefined);
                toast.error("Erro ao carregar questão");
                (modal as HTMLDialogElement).close();
            })
            .finally(() => {
                setLoadingModal(false);
            });
    }

    function handleApagarQuestao() {
        if (!(questao && questao.id)) return;

        QuestaoService.delete(questao.id)
            .then(() => {
                toast.success("Questão apagada com sucesso");
                setQuestoes((prev) => prev.filter((q) => q.id !== questao.id));
            })
            .catch(() => {
                toast.error("Erro ao apagar questão");
            });
    }

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl ml-4">Minhas Questões</h1>
                <Link to="/nova-questao" className="btn">
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
                        {questoes.map(({ id, enunciado }) => {
                            return (
                                <tr key={id} className="hover">
                                    <td>{enunciado}</td>
                                    <td>
                                        <div className="grid grid-cols-2">
                                            <Link
                                                className="btn btn-sm mr-2"
                                                to={`/questao/${id}/`}
                                            >
                                                <i className="fa-solid fa-pen" />
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                onClick={() => {
                                                    if (id) openDeleteModal(id);
                                                }}
                                            >
                                                <i className="fa-solid fa-times" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <dialog
                id="excluir_questao_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Apagar questão</h3>
                    {loadingModal ? (
                        <SkeletonLoading count={2} />
                    ) : (
                        <p className="py-4">
                            Você ira apagar a questão{" "}
                            <span className="italic">{`${questao?.enunciado}`}</span>
                        </p>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost mr-2">
                                Cancelar
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={handleApagarQuestao}
                            >
                                Apagar
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default MinhasQuestoes;
