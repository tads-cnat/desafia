import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PartidaService from "../../services/PartidaService";
import { toast } from "sonner";
import { setGameId } from "../../store/GameStore";
import { AppRoutes } from "../../utils/appRoutes";

function ConectarSe(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const navigate = useNavigate();

    function handleGameIdSubmission(values: FieldValues) {
        PartidaService.entrar(values.codigoAcesso)
            .then((res) => {
                setGameId(res.data.id);
                navigate(AppRoutes.PEDIR_APELIDO);
            })
            .catch((err) => {
                setGameId("");
                if (err.status === 404) {
                    toast.error("Partida não encontrada.");
                } else {
                    toast.error("Houve um erro ao conectar a partida.");
                }
            })
            .finally(() => {});
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center relative">
                <form
                    className="min-w-sm"
                    onSubmit={handleSubmit(handleGameIdSubmission)}
                >
                    <Input
                        {...register("codigoAcesso", { required: true })}
                        type="number"
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
                <Link
                    to={AppRoutes.DASHBOARD}
                    className="absolute bottom-4 text-sm text-blue-600 hover:underline"
                >
                    Fazer login
                </Link>
            </div>
        </>
    );
}

export default ConectarSe;
