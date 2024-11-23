import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useThemeStore } from "../store/ThemeStore";
import { useEffect, useState } from "react";

interface SkeletonLoadingProps {
    count?: number;
}

function SkeletonLoading({ count = 1 }: SkeletonLoadingProps): JSX.Element {
    const { theme, themes } = useThemeStore();
    const [skeletonTheme, setSkeletonTheme] = useState<
        { baseColor: string; highlightColor: string } | undefined
    >(undefined);

    useEffect(() => {
        if (themes.dark.includes(theme)) {
            setSkeletonTheme({ baseColor: "#202020", highlightColor: "#444" });
        } else {
            setSkeletonTheme(undefined);
        }
    }, [theme]);

    return (
        <SkeletonTheme
            baseColor={skeletonTheme?.baseColor}
            highlightColor={skeletonTheme?.highlightColor}
        >
            <Skeleton count={count} />
        </SkeletonTheme>
    );
}

export default SkeletonLoading;
