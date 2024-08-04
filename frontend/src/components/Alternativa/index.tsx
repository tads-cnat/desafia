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
        blue: "bg-blue-500 hover:bg-blue-600",
        red: "bg-red-500 hover:bg-red-600",
        yellow: "bg-yellow-500 hover:bg-yellow-600 ",
        green: "bg-green-500 hover:bg-green-600",
    };

    function handleClick(): void {
        onClick();
    }

    return (
        <button
            className={`${colorVariants[color]} flex-1 m-1 transition-all text-white cursor-pointer rounded flex justify-center items-center`}
            onClick={handleClick}
        >
            <h1 className="text-9xl">{content}</h1>
        </button>
    );
}

export default Alternativa;
