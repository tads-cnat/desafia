import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import {
    setGameId,
    setName,
    setPlayerId,
    useGameStore,
} from "../../store/GameStore";
import { useNavigate } from "react-router-dom";
import PartidaService from "../../services/PartidaService";
import { toast } from "sonner";

function PedirApelido(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const { gameId } = useGameStore();
    const navigate = useNavigate();

    function handleApelidoSubmission(values: FieldValues) {
        PartidaService.reservarNome(gameId as string, values.nome)
            .then((res) => {
                console.log(res);
                setPlayerId(res.data.id as number);
                setName(values.nome);
                setGameId(gameId as string);
                navigate(`/partida/jogar`);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Houve um erro ao reservar o nome.");
            });
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col m-auto justify-center items-center">
                <form
                    className="min-w-sm"
                    onSubmit={handleSubmit(handleApelidoSubmission)}
                >
                    <Input
                        {...register("nome", { required: true })}
                        type="text"
                        label="Apelido"
                        placeholder="Insira seu apelido"
                        control={control}
                    />

                    <div className="flex justify-end mt-2">
                        <button className="btn btn-primary self-end">
                            Juntar-se
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PedirApelido;
