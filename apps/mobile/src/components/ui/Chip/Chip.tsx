import { Pressable, Text } from "react-native";

import { ChipProps } from "./Chip.types";
import { Colors, Radius, Typography } from "@/theme";

export function Chip({
    title,
    selected = false,
    onPress,
}: ChipProps) {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: selected
                    ? Colors.primary
                    : Colors.surface,

                borderRadius: Radius.full,
                paddingHorizontal: 18,
                paddingVertical: 10,
            }}
        >
            <Text
                style={{
                    color: selected
                        ? Colors.white
                        : Colors.muted,

                    fontWeight: "600",

                    fontSize: Typography.small,
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
}