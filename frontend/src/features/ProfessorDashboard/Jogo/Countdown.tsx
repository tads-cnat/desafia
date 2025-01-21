import { useEffect, useState } from "react";

interface CountdownProps {
    counter: number;
    onZero: () => void;
    delay?: number;
}

function Countdown({
    counter,
    onZero,
    delay = 0,
}: CountdownProps): JSX.Element {
    const [currentCounter, setCurrentCounter] = useState(counter);
    const [delayCounter, setDelayCounter] = useState<number>(delay);
    const [triggered, setTriggered] = useState<boolean>(false);
    const [delayEnded, setDelayEnded] = useState<boolean>(delay === 0);

    useEffect(() => {
        if (!delayEnded || triggered) return;
        if (currentCounter > -1) {
            const counterTimeout = setInterval(() => {
                setCurrentCounter((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(counterTimeout);
        } else {
            onZero();
            setTriggered(true);
        }
    }, [currentCounter, onZero, delayEnded]);

    useEffect(() => {
        if (delayCounter > 1) {
            const delayTimeout = setTimeout(() => {
                setDelayCounter((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(delayTimeout);
        } else {
            setDelayEnded(true);
        }
    }, [delayCounter]);

    return (
        <span className="countdown font-mono text-6xl">
            <span
                style={
                    {
                        "--value": delayEnded ? currentCounter : -1,
                    } as React.CSSProperties
                }
            >
                {currentCounter}
            </span>
        </span>
    );
}

export default Countdown;
