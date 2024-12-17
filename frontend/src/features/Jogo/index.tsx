import { useGameStore } from "../../store/GameStore";
import JuntarSe from "./JuntarSe";

function Jogo(): JSX.Element {
    const { gameId, nickname } = useGameStore();

    if (!gameId) {
        return <JuntarSe />;
    }

    return <>Joguinho</>;
}

export default Jogo;
