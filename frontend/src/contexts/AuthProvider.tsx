import { createContext, useState } from "react";

interface AuthContextProps {
    token?: string;
    refreshToken?: string;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    token: undefined,
    login: (token: string, refreshToken: string) => {
        return { token, refreshToken };
    },
    logout: (): void => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();

    function login(token: string, refreshToken: string) {
        setToken(token);
        setRefreshToken(refreshToken);
    }

    function logout() {
        setToken(undefined);
        setRefreshToken(undefined);
    }

    return (
        <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
