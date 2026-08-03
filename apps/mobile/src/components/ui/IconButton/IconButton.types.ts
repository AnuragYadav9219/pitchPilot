import { LucideIcon } from "lucide-react-native";

export interface IconButtonProps {
    icon: LucideIcon;
    onPress?: () => void;
    size?: number;
    iconSize?: number;
    variant?: "primary" | "secondary" | "ghost";
    disabled?: boolean;
}