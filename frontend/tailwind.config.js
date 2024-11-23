import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    plugins: [daisyui, typography],

    daisyui: {
        themes: ["night", "emerald", "dark", "light"],
    },

    theme: {
        colors: {
            "bg-gradient-start": "#0f172a",
            "bg-gradient-mid": "#005a78",
            "bg-gradient-end": "#00a9ba",
        },
    },
};
