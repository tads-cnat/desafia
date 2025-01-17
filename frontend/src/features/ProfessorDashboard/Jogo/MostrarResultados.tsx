interface MostrarResultadosProps {
    onNextQuestion: () => void;
}

function MostrarResultados({
    onNextQuestion,
}: MostrarResultadosProps): JSX.Element {
    return (
        <div>
            <h1>Mostrando resultados!</h1>
            <button className="btn btn-primary" onClick={onNextQuestion}>
                {" "}
                Próxima Questão{" "}
            </button>
        </div>
    );
}

export default MostrarResultados;
