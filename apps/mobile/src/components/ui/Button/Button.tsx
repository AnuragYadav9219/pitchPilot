import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";

import {
    Radius,
    Typography,
} from "@/theme";

import { useTheme } from "@/theme/provider";

import type { ButtonProps } from "./Button.types";

import {
    createButtonVariants,
} from "./Button.styles";

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
    const { colors } = useTheme();

    const variants = createButtonVariants(colors);
    const currentVariant = variants[variant];

    const isDisabled = disabled || loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            android_ripple={{
                color: colors.surface3,
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
                backgroundColor:
                    currentVariant.backgroundColor,
                borderWidth:
                    currentVariant.borderWidth,
                borderColor:
                    currentVariant.borderColor,
                opacity: isDisabled ? 0.6 : 1,
            }}
        >
            {loading ? (
                <ActivityIndicator
                    color={currentVariant.textColor}
                />
            ) : (
                <>
                    {leftIcon && (
                        <View
                            style={{
                                marginRight: 8,
                            }}
                        >
                            {leftIcon}
                        </View>
                    )}

                    <Text
                        style={{
                            color:
                                currentVariant.textColor,
                            fontSize:
                                Typography.body,
                            fontWeight: "700",
                        }}
                    >
                        {title}
                    </Text>

                    {rightIcon && (
                        <View
                            style={{
                                marginLeft: 8,
                            }}
                        >
                            {rightIcon}
                        </View>
                    )}
                </>
            )}
        </Pressable>
    );
}