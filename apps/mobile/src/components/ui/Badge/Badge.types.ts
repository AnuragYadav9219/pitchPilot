export type BadgeVariant =
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";

export interface BadgeProps {
    text: string;
    variant?: BadgeVariant;
}