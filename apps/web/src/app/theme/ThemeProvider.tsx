import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    Colors,
    type ThemeColors,
    type ThemeMode,
} from "@virtualmento/shared";
import { applyTheme } from "@/styles/theme";

interface ThemeContextValue {
    mode: ThemeMode;
    colors: ThemeColors;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext =
    createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = "virtualmento-theme";

function getInitialTheme(): ThemeMode {
    const stored =
        localStorage.getItem(STORAGE_KEY);

    if (
        stored === "light" ||
        stored === "dark"
    ) {
        return stored;
    }

    return window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches
        ? "dark"
        : "light";
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [mode, setMode] =
        useState<ThemeMode>(getInitialTheme);

    const colors = Colors[mode];

    useEffect(() => {
        applyTheme(mode);

        localStorage.setItem(
            STORAGE_KEY,
            mode,
        );
    }, [mode]);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            colors,

            toggleTheme() {
                setMode((current) =>
                    current === "dark"
                        ? "light"
                        : "dark",
                );
            },

            setTheme(nextMode) {
                setMode(nextMode);
            },
        }),
        [mode, colors],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider",
        );
    }

    return context;
}