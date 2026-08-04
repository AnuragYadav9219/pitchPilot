import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { Colors, Radius, Typography } from "@/theme";

import { ButtonProps } from "./Button.types";
import { variants } from "./Button.styles";

export function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    variant = "primary",
    fullWidth = true,
}: ButtonProps) {
    const currentVariant = variants[variant];

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            android_ripple={{
                color: "rgba(255,255,255,0.08)",
                borderless: false,
            }}
            className={`
        flex-row
        items-center
        justify-center
        ${fullWidth ? "w-full" : ""}
      `}
            style={{
                height: 56,
                borderRadius: Radius.lg,
                backgroundColor: currentVariant.backgroundColor,
                borderWidth: currentVariant.borderWidth,
                borderColor: currentVariant.borderColor,
                opacity: disabled || loading ? 0.6 : 1,
            }}
        >
            {loading ? (
                <ActivityIndicator color={currentVariant.textColor} />
            ) : (
                <>
                    {leftIcon && (
                        <View style={{ marginRight: 8 }}>
                            {leftIcon}
                        </View>
                    )}

                    <Text
                        style={{
                            color: currentVariant.textColor,
                            fontSize: Typography.body,
                            fontWeight: "700",
                        }}
                    >
                        {title}
                    </Text>

                    {rightIcon && (
                        <View style={{ marginLeft: 8 }}>
                            {rightIcon}
                        </View>
                    )}
                </>
            )}
        </Pressable>
    );
}