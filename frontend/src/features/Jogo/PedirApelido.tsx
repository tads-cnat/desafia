import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useGameStore } from "../../store/GameStore";
import { createSearchParams, useNavigate } from "react-router-dom";
import PartidaService from "../../services/PartidaService";
import { toast } from "sonner";

function PedirApelido(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const { setNickname, gameId } = useGameStore();
    const navigate = useNavigate();

    function handleApelidoSubmission(values: FieldValues) {
        PartidaService.reservarNome(gameId as string, values.nome)
            .then((res) => {
                console.log(res);
                navigate({
                    pathname: "jogar",
                    search: createSearchParams({
                        ...values,
                        gameId: gameId as string,
                    }).toString(),
                });
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
                <div className="flex justify-end mt-2">
                    <button
                        className="btn btn-secondary self-end"
                        onClick={() => {
                            sendJsonMessage({
                                action: "set_answer",
                                resposta_id: 5,
                                questao_id: 2,
                            });
                        }}
                    >
                        Enviar resposta
                    </button>
                </div>
            </div>
        </>
    );
}

export default PedirApelido;
