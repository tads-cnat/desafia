import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useGameStore } from "../../store/GameStore";
import { useNavigate } from "react-router-dom";

function ConectarSe(): JSX.Element {
    const { handleSubmit, register, control } = useForm();
    const { setGameId } = useGameStore();
    const navigate = useNavigate();

    function handleGameIdSubmission(values: FieldValues) {
        setGameId(values.gameId);
        navigate("/jogar");
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col m-auto justify-center items-center">
                <form
                    className="min-w-sm"
                    onSubmit={handleSubmit(handleGameIdSubmission)}
                >
                    <Input
                        {...register("gameId", { required: true })}
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
