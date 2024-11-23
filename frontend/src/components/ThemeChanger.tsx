import { useThemeStore } from "../store/ThemeStore";

function ThemeChanger(): JSX.Element {
    const { theme: selectedTheme, setTheme, themes } = useThemeStore();

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Tema
                <i className="fas fa-caret-down" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
            >
                {[...themes.dark, ...themes.light].map((theme) => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={
                                theme.charAt(0).toUpperCase() + theme.slice(1)
                            }
                            value={theme}
                            checked={selectedTheme === theme}
                            onChange={() => setTheme(theme)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThemeChanger;
