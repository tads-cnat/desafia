import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/application/User";
import { LoginResponse } from "../types/application/LoginResponse";

export interface AuthStore {
    login: (payload: LoginResponse) => void;
    logout: () => void;
    updateRefreshToken: (newRefreshToken: string) => void;
    auth?: LoginResponse;
}

const useAuth = create(
    persist<AuthStore>(
        (set, get) => ({
            login: (payload) => {
                set({
                    auth: payload,
                });
            },
            logout: () => {
                set({ auth: undefined });
            },
            updateRefreshToken: (refresh) => {
                const currentAuth = get().auth;
                if (currentAuth) {
                    set({
                        auth: {
                            ...currentAuth,
                            refresh,
                        },
                    });
                }
            },
        }),
        { name: "auth" },
    ),
);

export const getAuth = (): LoginResponse | undefined => useAuth.getState().auth;

export const logout = (): void => {
    useAuth.getState().logout();
};

export const getUser = (): User | undefined => useAuth.getState().auth?.user;

export default useAuth;
