import { Text, View } from "react-native";

import { Brand } from "@virtualmento/shared";

import { useTheme } from "@/theme/provider";

interface AuthHeaderProps {
    title?: string;
    description?: string;
}

export function AuthHeader({
    title = "Welcome back.",
    description = `Continue your ${Brand.name} journey and keep building real-world confidence.`,
}: AuthHeaderProps) {
    const { colors } = useTheme();

    return (
        <View
            style={{
                marginBottom: 24,
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: 30,
                    lineHeight: 36,
                    fontWeight: "800",
                    letterSpacing: -0.5,
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    marginTop: 8,
                    color: colors.muted,
                    fontSize: 14,
                    lineHeight: 21,
                    maxWidth: 310,
                }}
            >
                {description}
            </Text>
        </View>
    );
}