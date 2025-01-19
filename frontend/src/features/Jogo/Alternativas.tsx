import { useEffect, useRef } from "react";
import { Questao } from "../../types/models/Questao";

interface AlaternativasProps {
    questao?: Questao;
    onClick: (id?: number, elapsedTime?: number) => void;
}

function Alternativas({ questao, onClick }: AlaternativasProps): JSX.Element {
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        startTimeRef.current = Date.now();
    }, []);

    const alternativaColor: Record<number, string> = {
        0: "bg-success",
        1: "bg-warning",
        2: "bg-error",
        3: "bg-info",
    };

    const handleClick = (id?: number) => {
        if (startTimeRef.current !== null) {
            const elapsedTime = Date.now() - startTimeRef.current;
            onClick(id, elapsedTime ?? 0);
        } else {
            onClick(id);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2 w-screen h-screen p-4">
            {questao?.alternativas?.map((a, index) => (
                <div
                    key={index}
                    className={
                        alternativaColor[index] +
                        " p-10 text-4xl font-semibold rounded-xl dark:text-neutral-50 "
                    }
                    onClick={() => handleClick(a.id)}
                />
            ))}
        </div>
    );
}

export default Alternativas;
