import { Text, View } from "react-native";

import { Colors, Radius, Typography } from "@/theme";

import { BadgeProps } from "./Badge.types";

export function Badge({
    text,
    variant = "neutral",
}: BadgeProps) {
    const variants = {
        primary: Colors.primary,
        success: Colors.success,
        warning: Colors.warning,
        danger: Colors.danger,
        neutral: Colors.surface,
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
                    color: Colors.text,
                    fontSize: Typography.tiny,
                    fontWeight: "600",
                }}
            >
                {text}
            </Text>
        </View>
    );
}