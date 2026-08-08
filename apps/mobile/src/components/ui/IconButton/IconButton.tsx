import { Pressable } from "react-native";

import { Radius } from "@/theme";

import { IconButtonProps } from "./IconButton.types";
import { useTheme } from "@/theme/provider";

export function IconButton({
    icon: Icon,
    onPress,
    size = 48,
    iconSize = 22,
    variant = "secondary",
    disabled = false,
}: IconButtonProps) {
    const {colors} = useTheme();

    const background = {
        primary: colors.primary,
        secondary: colors.surface,
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
                color={colors.text}
                strokeWidth={2}
            />
        </Pressable>
    );
}