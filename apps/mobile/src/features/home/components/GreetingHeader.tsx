import { Text, View } from "react-native";

import { useTheme } from "@/theme/provider";

export function GreetingHeader() {
    const { colors } = useTheme();

    return (
        <View>
            <Text
                style={{
                    color: colors.text,
                    fontSize: 28,
                    fontWeight: "700",
                }}
            >
                Welcome back
            </Text>

            <Text
                style={{
                    color: colors.muted,
                    marginTop: 6,
                }}
            >
                Ready to improve your skills?
            </Text>
        </View>
    );
}