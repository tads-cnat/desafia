import { useEffect, useState } from "react";

interface CountdownProps {
    counter: number;
    onZero: () => void;
}

function Countdown({ counter, onZero }: CountdownProps): JSX.Element {
    const [currentCounter, setCurrentCounter] = useState(counter);
    const [triggered, setTriggered] = useState<boolean>(false);

    useEffect(() => {
        if (triggered) return;
        
        if (currentCounter > -1) {
            const interval = setInterval(() => {
                setCurrentCounter((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            onZero();
            setTriggered(true);
        }
    }, [currentCounter, onZero]);

    return (
        <span className="countdown font-mono text-6xl">
            <span style={{ "--value": currentCounter } as React.CSSProperties}>
                {currentCounter}
            </span>
        </span>
    );
}

export default Countdown;
