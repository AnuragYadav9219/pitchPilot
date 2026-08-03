import { Pressable } from "react-native";
import { IconButtonProps } from "./IconButton.types";

export function IconButton({
    icon: Icon,
    onPress,
    size = 48,
    iconSize = 22,
    variant = "secondary",
    disabled = false,
}: IconButtonProps) {
    const variants = {
        primary: "bg-primary",
        secondary: "bg-zinc-900",
        ghost: "bg-transparent",
    };

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            className={`items-center justify-center rounded-full ${variants[variant]} ${disabled ? "opacity-50" : ""}`}
            style={{
                width: size,
                height: size,
            }}
        >
            <Icon
                size={iconSize}
                color="#FFFFFF"
                strokeWidth={2}
            />
        </Pressable>
    )
}