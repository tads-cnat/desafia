import { Questao } from "../../types/models/Questao";

interface AlaternativasProps {
    questao?: Questao;
    onClick: (id?: number) => void;
}

function Alternativas({ questao, onClick }: AlaternativasProps): JSX.Element {
    const alternativaColor: Record<number, string> = {
        0: "bg-success",
        1: "bg-warning",
        2: "bg-error",
        3: "bg-info",
    };

    return (
        <div className="grid">
            <div className="grid grid-cols-2 gap-2 ">
                {questao?.alternativas?.map((a, index) => (
                    <div
                        key={index}
                        className={
                            alternativaColor[index] +
                            " p-10 text-4xl font-semibold rounded-xl dark:text-neutral-50 "
                        }
                        onClick={() => {
                            onClick(a.id);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Alternativas;
