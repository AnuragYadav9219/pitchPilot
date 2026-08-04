import { Pressable } from "react-native";

import { Colors, Radius } from "@/theme";

import { IconButtonProps } from "./IconButton.types";

export function IconButton({
    icon: Icon,
    onPress,
    size = 48,
    iconSize = 22,
    variant = "secondary",
    disabled = false,
}: IconButtonProps) {

    const background = {
        primary: Colors.primary,
        secondary: Colors.surface,
        ghost: "transparent",
    };

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            android_ripple={{
                color: "rgba(255,255,255,0.08)",
            }}
            style={{
                width: size,
                height: size,
                borderRadius: Radius.full,
                backgroundColor: background[variant],
                alignItems: "center",
                justifyContent: "center",
                opacity: disabled ? 0.5 : 1,
            }}
        >
            <Icon
                size={iconSize}
                color={Colors.text}
                strokeWidth={2}
            />
        </Pressable>
    );
}