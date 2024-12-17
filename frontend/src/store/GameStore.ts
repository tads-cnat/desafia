import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GameStore {
    nickname?: string;
    setNickname: (username: string) => void;
    gameId?: string;
    setGameId: (username: string) => void;
}

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            nickname: undefined,
            setNickname: (nickname: string) => {
                set({ nickname });
            },
            gameId: undefined,
            setGameId: (gameId: string) => {
                set({ gameId });
            },
        }),
        {
            name: "game-storage",
        },
    ),
);
