interface MostrarRespostaProps {
    correta: boolean;
    pontos: number;
}

function MostrarResposta({
    correta = false,
    pontos = 0,
}: MostrarRespostaProps): JSX.Element {
    return (
        <div className="stats stats-vertical shadow">
            <div className="stat">
                <div
                    className={
                        "stat-figure " +
                        (correta ? "text-success" : "text-error")
                    }
                >
                    <svg
                        width="60px"
                        height="60px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="24" height="24" fill="white" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <div className="stat-title">Resultado</div>
                <div className="stat-value">
                    {correta ? "Certo!" : "Errado"}
                </div>
                <div className="stat-desc">
                    {correta ? "Boa!" : "Mais sorte da próxima vez!"}
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                </div>
                <div className="stat-title">Pontuação</div>
                <div className="stat-value">{pontos}</div>
                <div className="stat-desc">pontos na última questão</div>
            </div>
        </div>
    );
}

export default MostrarResposta;
