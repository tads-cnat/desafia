import { Toaster } from "sonner";
import { useThemeStore } from "../store/ThemeStore";
import { useEffect, useState } from "react";

function Toast(): JSX.Element {
    const { theme, themes } = useThemeStore();
    const [toasterTheme, setToasterTheme] = useState<
        "light" | "dark" | "system"
    >("light");
    useEffect(() => {
        if (themes.dark.includes(theme)) {
            setToasterTheme("dark");
        } else {
            setToasterTheme("light");
        }
    }, [theme]);
    return (
        <Toaster richColors position="top-center" expand theme={toasterTheme} />
    );
}

export default Toast;
