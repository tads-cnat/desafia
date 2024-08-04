import Alternativa from "../../components/Alternativa";

const alternativas = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

function Escolhas(): JSX.Element {
    function responder(resposta: number) {
        console.log(resposta);
    }

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-1">
                    <Alternativa
                        color="blue"
                        content="A"
                        onClick={() => responder(alternativas[0].id)}
                    />

                    <Alternativa
                        color="green"
                        content="B"
                        onClick={() => responder(alternativas[1].id)}
                    />
                </div>
                <div className="flex flex-1">
                    <Alternativa
                        color="yellow"
                        content="C"
                        onClick={() => responder(alternativas[2].id)}
                    />

                    <Alternativa
                        color="red"
                        content="D"
                        onClick={() => responder(alternativas[3].id)}
                    />
                </div>
            </div>
        </>
    );
}

export default Escolhas;
