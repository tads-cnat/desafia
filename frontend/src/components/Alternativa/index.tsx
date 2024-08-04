interface AlternativaProps {
    onClick: () => void;
    color: string;
    content: string;
}

function Alternativa({
    color,
    onClick,
    content,
}: AlternativaProps): JSX.Element {
    const colorClass = `bg-${color}-500 hover:bg-${color}-600`;

    return (
        <button
            className={`flex-1 m-1 ${colorClass} transition text-white cursor-pointer rounded flex justify-center items-center`}
            onClick={onClick}
        >
            <h1 className="text-9xl">{content}</h1>
        </button>
    );
}

export default Alternativa;
