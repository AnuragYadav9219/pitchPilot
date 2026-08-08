import { Text, View } from "react-native";

import { Radius, Typography } from "@/theme";

import type { BadgeProps } from "./Badge.types";
import { useTheme } from "@/theme/provider";

export function Badge({
    text,
    variant = "neutral",
}: BadgeProps) {
    const {colors} = useTheme()

    const variants = {
        primary: colors.primary,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
        neutral: colors.surface,
    };

    return (
        <View
            style={{
                backgroundColor: variants[variant],
                borderRadius: Radius.full,
                paddingHorizontal: 12,
                paddingVertical: 6,
                alignSelf: "flex-start",
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: Typography.tiny,
                    fontWeight: "600",
                }}
            >
                {text}
            </Text>
        </View>
    );
}