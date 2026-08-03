import { ActivityIndicator, Pressable, Text } from "react-native";
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
    const style = variants[variant];

    return (
        <Pressable
            disabled={disabled || loading}
            onPress={onPress}
            className={`flex-row items-center justify-center rounded-2xl px-6 py-4 ${style.container} ${fullWidth
                ? "w-full"
                : ""} ${(disabled || loading)
                    ? "opacity-60"
                    : ""}`}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <>
                    {leftIcon}
                    <Text className={`mx-2 text-lg font-semibold ${style.text}`}>
                        {title}
                    </Text>

                    {rightIcon}
                </>
            )}
        </Pressable>
    );
}