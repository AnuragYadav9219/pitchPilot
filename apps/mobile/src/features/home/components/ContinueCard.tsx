import { Text, View } from "react-native";

import { useTheme } from "@/theme/provider";

export function ContinueCard() {
    const { colors } = useTheme();

    return (
        <View
            style={{
                marginTop: 20,
                padding: 20,
                borderRadius: 20,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            }}
        >
            <Text
                style={{
                    color: colors.primary,
                    fontSize: 13,
                    fontWeight: "700",
                }}
            >
                CONTINUE PRACTICE
            </Text>

            <Text
                style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: "700",
                    marginTop: 8,
                }}
            >
                Interview Practice
            </Text>

            <Text
                style={{
                    color: colors.muted,
                    marginTop: 6,
                }}
            >
                Continue where you left off.
            </Text>
        </View>
    );
}