import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import AuthService from "../../services/AuthService";
import useAuth from "../../store/AuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { AppRoutes } from "../../utils/appRoutes";

interface RegisterForm {
    nome?: string;
    username?: string;
    password?: string;
    confirm_password?: string;
}

function Register(): JSX.Element {
    const { login } = useAuth();
    const { register, handleSubmit, control, setError } =
        useForm<RegisterForm>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    async function handleRegisterSubmission(data: FieldValues) {
        setLoading(true);
        const { username, password, nome, confirm_password } = data;

        if (password !== confirm_password) {
            const error = {
                message: "As senhas não coincidem",
            };
            setError("confirm_password", error);
            setError("password", error);
            setLoading(false);
            return;
        }

        try {
            const loginResponse = await AuthService.register(
                nome,
                username,
                password,
            );
            login(loginResponse);
            toast.success("Cadastro efetuado com sucesso!");
            navigate(AppRoutes.LOGIN, { replace: true });
        } catch (err) {
            handleError(err as AxiosError);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleError(err: AxiosError) {
        const { response } = err as AxiosError<{ detail: string }>;

        toast.error(response?.data?.detail);
    }

    return (
        <div className="w-screen h-screen flex flex-col m-auto justify-center items-center">
            <form
                className="min-w-sm"
                onSubmit={handleSubmit(handleRegisterSubmission)}
            >
                <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
                    <h1 className="text-3xl font-bold self-center">
                        Crie sua conta
                    </h1>

                    <Input
                        {...register("nome", { required: true })}
                        type="text"
                        label="Qual o seu nome?"
                        control={control}
                    />

                    <div className="divider" />

                    <Input
                        {...register("username", { required: true })}
                        type="text"
                        label="Qual será seu nome de usuário?"
                        control={control}
                    />

                    <div className="divider" />
                    <Input
                        {...register("password", { required: true })}
                        type="password"
                        label="Digite sua senha"
                        control={control}
                    />

                    <Input
                        {...register("confirm_password", { required: true })}
                        label="Digite novamente sua senha"
                        type="password"
                        control={control}
                    />

                    <div className="divider" />

                    <button className="btn btn-primary">
                        {loading ? (
                            <span className="loading loading-spinner loading-xs" />
                        ) : (
                            <>Registrar</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
