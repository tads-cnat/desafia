import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeStore {
    theme: string;
    themes: {
        light: string[];
        dark: string[];
    };
    setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            themes: {
                light: ["light", "emerald"],
                dark: ["dark", "night"],
            },
            setTheme: (theme: string) => {
                set(() => {
                    document.documentElement.setAttribute("data-theme", theme);
                    return { theme };
                });
            },
        }),
        {
            name: "theme-storage",
            onRehydrateStorage: () => (state) => {
                if (state?.theme) {
                    document.documentElement.setAttribute(
                        "data-theme",
                        state.theme,
                    );
                }
            },
        },
    ),
);
