import { FieldValues, useForm } from "react-hook-form";

function Dashboard() {
    const { register, handleSubmit } = useForm();

    function conectar(data: FieldValues) {
        console.log(data);
    }

    return (
        <>
            <div className="flex flex-col h-screen justify-center items-center">
                <form
                    onSubmit={handleSubmit(conectar)}
                    className="border-solid border rounded-lg p-5"
                >
                    <label className="form-control w-full max-w-xs mb-3">
                        <div className="label">
                            <span className="label-text">Nome</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Insira o nome do jogador aqui"
                            className="input input-bordered w-full max-w-xs"
                            {...register("username")}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mb-5">
                        <div className="label">
                            <span className="label-text">
                                Endereço do servidor
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="127.0.0.1:8000"
                            className="input input-bordered w-full max-w-xs"
                            {...register("address")}
                        />
                    </label>
                    <div className="flex w-full justify-end">
                        <button className="btn btn-primary">Juntar-se</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Dashboard;
