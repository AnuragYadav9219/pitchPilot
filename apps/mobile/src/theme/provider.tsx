import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    Colors,
    type ThemeColors,
    type ThemeMode,
} from "@virtualmento/shared";

export interface ThemeContextValue {
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

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [mode, setMode] =
        useState<ThemeMode>("dark");

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,

            colors: Colors[mode],

            toggleTheme: () => {
                setMode((current) =>
                    current === "dark"
                        ? "light"
                        : "dark",
                );
            },

            setTheme: (nextMode: ThemeMode) => {
                setMode(nextMode);
            },
        }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider",
        );
    }

    return context;
}