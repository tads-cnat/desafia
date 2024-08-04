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
    const colorVariants: Record<string, string> = {
        blue: "bg-blue-600 hover:bg-blue-500",
        red: "bg-red-500 hover:bg-red-400",
        yellow: "bg-yellow-300 hover:bg-yellow-400 ",
        green: "bg-green-300 hover:bg-green-400",
    };

    return (
        <button
            className={`${colorVariants[color]} flex-1 m-1 transition text-white cursor-pointer rounded flex justify-center items-center`}
            onClick={onClick}
        >
            <h1 className="text-9xl">{content}</h1>
        </button>
    );
}

export default Alternativa;
