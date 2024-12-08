import React, { createContext, useState, useCallback } from "react";

export interface ReloadContextType {
    forceReload: () => void;
    reload: number;
}

export const ReloadContext = createContext<ReloadContextType | undefined>(
    undefined,
);

export const ReloadProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [reload, setReloadCount] = useState(0);

    const forceReload = useCallback(() => {
        setReloadCount((prev) => prev + 1);
    }, []);

    return (
        <ReloadContext.Provider value={{ forceReload, reload }}>
            {children}
        </ReloadContext.Provider>
    );
};
