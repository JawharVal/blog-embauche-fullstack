"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            className="ml-auto px-3 py-1 border rounded text-sm
                       bg-gray-100 dark:bg-white dark:text-black"
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
