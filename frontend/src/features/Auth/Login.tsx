import { FieldValues, useForm } from "react-hook-form";
import Input from "../../components/Input";
import AuthService from "../../services/AuthService";
import useAuth from "../../store/AuthStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { AppRoutes } from "../../utils/appRoutes";

interface LoginForm {
    username?: string;
    password?: string;
}

function Login(): JSX.Element {
    const { login } = useAuth();
    const { register, handleSubmit, control } = useForm<LoginForm>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    async function handleLoginSubmission(data: FieldValues) {
        setLoading(true);
        const { username, password } = data;

        try {
            const loginResponse = await AuthService.login(username, password);
            login(loginResponse);
            toast.success("Login efetuado com sucesso!");
            navigate(from, { replace: true });
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
                onSubmit={handleSubmit(handleLoginSubmission)}
            >
                <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
                    <h1 className="text-3xl font-bold self-center">Entrar</h1>

                    <span className="self-center">
                        Ainda não tem uma conta?{" "}
                        <Link
                            to={AppRoutes.SIGN_UP}
                            className="link link-secondary"
                        >
                            Registre-se
                        </Link>
                    </span>

                    <div className="divider">OU</div>

                    <Input
                        {...register("username", { required: true })}
                        type="text"
                        label="Nome de usuário"
                        control={control}
                    />

                    <Input
                        {...register("password", { required: true })}
                        label="Senha"
                        type="password"
                        control={control}
                    />

                    <div className="form-control">
                        <label className="cursor-pointer label self-start gap-2">
                            <input type="checkbox" className="checkbox" />
                            <span className="label-text">Lembre de mim</span>
                        </label>
                    </div>

                    <button className="btn btn-primary">
                        {loading ? (
                            <span className="loading loading-spinner loading-xs" />
                        ) : (
                            <>Entrar</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
