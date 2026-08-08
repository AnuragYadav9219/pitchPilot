import { Pressable, Text } from "react-native";

import { useTheme } from "@/theme/provider";

export function ThemeToggle() {
    const { mode, colors, toggleTheme } = useTheme();

    return (
        <Pressable
            onPress={toggleTheme}
            style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 14,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontWeight: "600",
                }}
            >
                {mode === "dark"
                    ? "☀ Light"
                    : "🌙 Dark"}
            </Text>
        </Pressable>
    );
}