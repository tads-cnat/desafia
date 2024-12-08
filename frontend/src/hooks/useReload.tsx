import { useContext } from "react";
import { ReloadContext, ReloadContextType } from "../contexts/ReloadContext";

export const useReload = (): ReloadContextType => {
    const context = useContext(ReloadContext);
    if (context === undefined) {
        throw new Error("useReload must be used within a ReloadProvider");
    }
    return context;
};
