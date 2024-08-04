import { useForm } from "react-hook-form";
import Alternativa from "../../components/Alternativa";

function Escolhas(): JSX.Element {
    function responder(resposta: string) {
        console.log(resposta);
    }
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-1">
                    <Alternativa
                        color="blue"
                        content="A"
                        onClick={() => responder("A")}
                    />

                    <Alternativa
                        color="green"
                        content="B"
                        onClick={() => responder("B")}
                    />
                </div>
                <div className="flex flex-1">
                    <Alternativa
                        color="yellow"
                        content="C"
                        onClick={() => responder("C")}
                    />

                    <Alternativa
                        color="red"
                        content="D"
                        onClick={() => responder("D")}
                    />
                </div>
            </div>
        </>
    );
}

export default Escolhas;
