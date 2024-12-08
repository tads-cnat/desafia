import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import AuthService from "../services/AuthService";
import useAuth from "../store/AuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface LoginForm {
    username?: string;
    password?: string;
}

function Login(): JSX.Element {
    const { login } = useAuth();
    const { register, handleSubmit, control } = useForm<LoginForm>();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleLoginSubmission(data: FieldValues) {
        const { username, password } = data;

        try {
            const loginResponse = await AuthService.login(username, password);
            login(loginResponse);
            toast.success("Login efetuado com sucesso!");
            navigate(from, { replace: true });
        } catch (err) {
            handleError(err as AxiosError);
            console.error(err);
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
                <Input
                    {...register("username", { required: true })}
                    type="text"
                    label="Nome de usuário"
                    placeholder="Insira seu nome de usuário"
                    control={control}
                />

                <Input
                    {...register("password", { required: true })}
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                    control={control}
                />

                <div className="flex justify-end mt-2">
                    <button className="btn btn-primary self-end">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
