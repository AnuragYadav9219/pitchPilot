import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme/provider";
import { Radius, Spacing, Typography } from "@/theme";

interface SocialLoginProps {
    loading?: boolean;
    onPress?: () => void;
}

export function SocialLogin({
    loading = false,
    onPress,
}: SocialLoginProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => ({
                height: 56,

                borderWidth: 1,
                borderColor: colors.border,

                borderRadius: Radius.md,

                justifyContent: "center",
                alignItems: "center",

                backgroundColor: colors.surface,

                opacity: loading
                    ? 0.6
                    : pressed
                        ? 0.75
                        : 1,
            })}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        width: 24,
                        height: 24,
                        marginRight: 8,
                        borderRadius: 999,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.surface2,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "800",
                            color: colors.text,
                        }}
                    >
                        G
                    </Text>
                </View>

                <Text
                    style={{
                        color: colors.text,
                        fontSize: Typography.body,
                        fontWeight: "600",
                    }}
                >
                    {loading
                        ? "Connecting..."
                        : "Continue with Google"}
                </Text>

            </View>
        </Pressable>
    );
}