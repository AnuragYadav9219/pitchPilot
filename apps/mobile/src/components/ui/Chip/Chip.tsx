import { Pressable, Text } from "react-native";

import { ChipProps } from "./Chip.types";

export function Chip({
    title,
    selected = false,
    onPress,
}: ChipProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`mr-3 rounded-full px-5 py-3 ${selected
                ? "bg-primary"
                : "bg-zinc-900"}`}
        >
            <Text
                className={`font-semibold ${selected
                    ? "text-white"
                    : "text-zinc-400"}`}
            >
                {title}
            </Text>
        </Pressable>
    );
}