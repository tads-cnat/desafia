import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import PartidaService from "../../services/PartidaService";
import { toast } from "sonner";
import { useGameStore } from "../../store/GameStore";

function ConectarSe(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const navigate = useNavigate();
    const { setGameId } = useGameStore();

    function handleGameIdSubmission(values: FieldValues) {
        PartidaService.entrar(values.codigoAcesso)
            .then((res) => {
                setGameId(res.data.id);
                navigate(`/partida`);
            })
            .catch((err) => {
                setGameId("");
                if (err.status === 400) {
                    toast.error("Partida não encontrada.");
                } else {
                    toast.error("Houve um erro ao conectar a partida.");
                }
            })
            .finally(() => {});
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col m-auto justify-center items-center">
                <form
                    className="min-w-sm"
                    onSubmit={handleSubmit(handleGameIdSubmission)}
                >
                    <Input
                        {...register("codigoAcesso", { required: true })}
                        type="text"
                        label="Código da sala"
                        placeholder="Insira o código da sala"
                        control={control}
                    />

                    <div className="flex justify-end mt-2">
                        <button className="btn btn-primary self-end">
                            Conectar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ConectarSe;
