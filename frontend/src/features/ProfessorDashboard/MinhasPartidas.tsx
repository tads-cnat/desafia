import { useEffect, useState } from "react";
import { Questionario } from "../../types/models/Questionario";
import SkeletonLoading from "../../components/SkeletonLoading";
import { Link, useNavigate } from "react-router-dom";
import { Partida } from "../../types/models/Partida";
import PartidaService from "../../services/PartidaService";
import { setAccessCode, setGameId } from "../../store/GameStore";

function MinhasPartidas(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [partidas, setPartidas] = useState<Partida[]>();

    useEffect(() => {
        setLoading(true);
        PartidaService.getAll()
            .then((response) => {
                const { items } = response;
                console.log(items);
                setPartidas(items);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <h1 className="text-2xl ml-4">Minhas Partidas</h1>
            {loading ? (
                <SkeletonLoading count={5} />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Ativa</th>
                            <th>Código de Acesso</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {partidas?.map((partida) => {
                            return (
                                <tr key={partida.id} className="hover">
                                    <td>{partida.id}</td>
                                    <td>
                                        {partida.ativa ? "Ativa" : "Finalizada"}
                                    </td>
                                    <td>{partida.codigo_acesso}</td>
                                    <td>
                                        <div className="grid grid-cols-1">
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => {
                                                    setGameId(partida.id);
                                                    setAccessCode(
                                                        partida.codigo_acesso,
                                                    );
                                                    navigate(
                                                        "/gerenciar-partida",
                                                    );
                                                }}
                                            >
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

export default MinhasPartidas;
