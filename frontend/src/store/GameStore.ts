import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GameStore {
    name?: string;
    gameId?: string;
    playerId?: number;
    accessCode?: string;
}

export const useGameStore = create<GameStore>()(
    persist<GameStore>(
        () => ({
            name: undefined,
            gameId: undefined,
            playerId: undefined,
            accessCode: undefined,
        }),
        {
            name: "game-infos",
        },
    ),
);

export const setName = (name: string) => {
    useGameStore.setState((prev) => {
        return { ...prev, name };
    });
};

export const setGameId = (gameId: string) => {
    useGameStore.setState((prev) => {
        return { ...prev, gameId };
    });
};

export const setPlayerId = (playerId: number) => {
    useGameStore.setState((prev) => {
        return { ...prev, playerId };
    });
};

export const setAccessCode = (accessCode: string) => {
    useGameStore.setState((prev) => {
        return { ...prev, accessCode };
    });
};
