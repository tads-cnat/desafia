import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";

function Login(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm();

    function login(data: Record<string, string>) {
        console.log(data);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form className="max-w-sm" onSubmit={handleSubmit(login)}>
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
