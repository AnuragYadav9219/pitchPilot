import { Platform, Text, TextInput, View } from "react-native";

import { Radius, Typography } from "@/theme";

import { InputProps } from "./Input.types";
import { useTheme } from "@/theme/provider";

export function Input({
    label,
    error,
    leftIcon,
    rightIcon,
    ...props
}: InputProps) {
    const {colors} = useTheme();

    return (
        <View className="mb-4">

            {label && (
                <Text
                    style={{
                        color: colors.muted,
                        fontSize: Typography.small,
                        fontWeight: "600",
                        marginBottom: 10,
                    }}
                >
                    {label}
                </Text>
            )}

            <View
                style={{
                    height: 48,
                    borderRadius: Radius.md,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: error
                        ? colors.danger
                        : colors.border,

                    flexDirection: "row",
                    alignItems: "center",

                    paddingHorizontal: 14,
                }}
            >
                {leftIcon}

                <TextInput
                    {...props}
                    placeholderTextColor={colors.muted}
                    selectionColor={colors.primary}
                    underlineColorAndroid="transparent"
                    style={[
                        {
                            flex: 1,
                            color: colors.text,
                            fontSize: Typography.body,
                            paddingVertical: 0,
                            backgroundColor: "transparent",
                            borderWidth: 0,
                        },
                        Platform.OS === "web"
                            ? ({
                                outlineStyle: "none",
                                boxShadow: "none",
                            } as any)
                            : {},
                    ]}
                />

                {rightIcon}
            </View>

            {error && (
                <Text
                    style={{
                        marginTop: 6,
                        color: colors.danger,
                        fontSize: Typography.tiny,
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
}