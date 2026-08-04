import { Colors } from "@/theme";

export const variants = {
    primary: {
        backgroundColor: Colors.primary,
        textColor: Colors.white,
        borderColor: "transparent",
        borderWidth: 0,
    },

    secondary: {
        backgroundColor: Colors.surface,
        textColor: Colors.white,
        borderColor: "transparent",
        borderWidth: 0,
    },

    outline: {
        backgroundColor: "transparent",
        textColor: Colors.white,
        borderColor: Colors.border,
        borderWidth: 1,
    },

    ghost: {
        backgroundColor: "transparent",
        textColor: Colors.white,
        borderColor: "transparent",
        borderWidth: 0,
    },

    danger: {
        backgroundColor: Colors.danger,
        textColor: Colors.white,
        borderColor: "transparent",
        borderWidth: 0,
    },
} as const;