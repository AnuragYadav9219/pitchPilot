import { Pressable, Text } from "react-native";

import { ChipProps } from "./Chip.types";
import { Radius, Typography } from "@/theme";
import { useTheme } from "@/theme/provider";

export function Chip({
    title,
    selected = false,
    onPress,
}: ChipProps) {
    const {colors} = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: selected
                    ? colors.primary
                    : colors.surface,

                borderRadius: Radius.full,
                paddingHorizontal: 18,
                paddingVertical: 10,
            }}
        >
            <Text
                style={{
                    color: selected
                        ? colors.white
                        : colors.muted,

                    fontWeight: "600",

                    fontSize: Typography.small,
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
}