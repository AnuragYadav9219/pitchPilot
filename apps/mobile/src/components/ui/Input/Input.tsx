import { Platform, Text, TextInput, View } from "react-native";

import { Colors, Radius, Typography } from "@/theme";

import { InputProps } from "./Input.types";

export function Input({
    label,
    error,
    leftIcon,
    rightIcon,
    ...props
}: InputProps) {
    return (
        <View className="mb-6">

            {label && (
                <Text
                    style={{
                        color: Colors.muted,
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
                    height: 56,
                    borderRadius: Radius.lg,
                    backgroundColor: Colors.surface,
                    borderWidth: 1,
                    borderColor: error
                        ? Colors.danger
                        : Colors.border,

                    flexDirection: "row",
                    alignItems: "center",

                    paddingHorizontal: 16,
                }}
            >
                {leftIcon}

                <TextInput
                    {...props}
                    placeholderTextColor={Colors.muted}
                    selectionColor={Colors.primary}
                    underlineColorAndroid="transparent"
                    style={[
                        {
                            flex: 1,
                            color: Colors.text,
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
                        color: Colors.danger,
                        fontSize: Typography.tiny,
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
}