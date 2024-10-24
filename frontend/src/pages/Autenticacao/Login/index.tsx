import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import AuthService from "../../../services/AuthService";
import useAuth from "../../../store/AuthStore";

interface LoginForm {
    username: string;
    password: string;
}

function Login(): JSX.Element {
    const { login, auth } = useAuth();
    const { register, handleSubmit } = useForm<LoginForm>();

    async function handleLoginSubmission(data: LoginForm) {
        const { username, password } = data;

        const loginResponse = await AuthService.login(username, password);

        login(loginResponse);

        console.log(auth);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form
                className="max-w-sm"
                onSubmit={handleSubmit(handleLoginSubmission)}
            >
                <Input
                    {...register("username", { required: true })}
                    type="text"
                    label="Nome de usuário"
                    placeholder="Insira seu nome de usuário"
                />

                <Input
                    {...register("password", { required: true })}
                    label="Senha"
                    placeholder="Insira sua senha"
                    type="password"
                />

                <div className="flex justify-end">
                    <button className="btn btn-primary self-end">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
