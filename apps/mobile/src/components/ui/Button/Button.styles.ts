import type { ThemeColors } from "@virtualmento/shared";

export function createButtonVariants(
    colors: ThemeColors,
) {
    return {
        primary: {
            backgroundColor: colors.primary,
            textColor: colors.white,
            borderColor: "transparent",
            borderWidth: 0,
        },

        secondary: {
            backgroundColor: colors.surface,
            textColor: colors.text,
            borderColor: "transparent",
            borderWidth: 0,
        },

        outline: {
            backgroundColor: "transparent",
            textColor: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
        },

        ghost: {
            backgroundColor: "transparent",
            textColor: colors.text,
            borderColor: "transparent",
            borderWidth: 0,
        },

        danger: {
            backgroundColor: colors.danger,
            textColor: colors.white,
            borderColor: "transparent",
            borderWidth: 0,
        },
    } as const;
}

export type ButtonVariant = keyof ReturnType<
    typeof createButtonVariants
>;