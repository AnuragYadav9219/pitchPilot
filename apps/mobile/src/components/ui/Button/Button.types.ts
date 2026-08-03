import { ReactNode } from "react";

export type ButtonVarient =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger";

export interface ButtonProps {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: ButtonVarient;
    fullWidth?: boolean;
}
