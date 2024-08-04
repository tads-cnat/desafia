import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#70b554",
                    DEFAULT: "#539839",
                    dark: "#3e7a2c",
                },
                secondary: {
                    light: "#d14331",
                    DEFAULT: "#b93120",
                    dark: "#961a18",
                },
                success: "#539839",
                info: "#5bc0de",
                warning: "#f0ad4e",
                danger: "#b93120",
                light: "#f8f9fa",
                dark: "#343a40",
            },
        },
    },
    plugins: [daisyui, typography],
};
