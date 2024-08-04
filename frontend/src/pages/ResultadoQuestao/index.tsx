interface ResultadoQuestaoProps {
    correto?: boolean;
    pontuacao?: number;
}

function ResultadoQuestao({
    correto = true,
    pontuacao = 1000,
}: ResultadoQuestaoProps): JSX.Element {
    return (
        <>
            {correto ? (
                <div className="h-screen bg-success flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <i className="fa-solid fa-check text-4xl text-white p-5" />
                        <h2 className="text-4xl text-white font-bold">
                            Acertou!
                        </h2>
                        <p className="text-white mt-5">
                            Você ganhou {pontuacao} pontos pelo seu acerto!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="h-screen bg-danger flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <i className="fa-solid fa-xmark text-4xl text-white p-5" />
                        <h2 className="text-4xl text-white font-bold">
                            Errou!
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
}

export default ResultadoQuestao;
