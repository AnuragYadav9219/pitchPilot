import { Text, TextInput, View } from "react-native";
import { InputProps } from "./Input.types";

export function Input({
    label,
    error,
    leftIcon,
    rightIcon,
    ...props
}: InputProps) {
    return (
        <View className="mb-5">
            {label && (
                <Text className="mb-2 text-sm font-semibold text-zinc-300">
                    {label}
                </Text>
            )}

            <View className={`flex-row items-center rounded-2xl border px-4 py-4 ${error
                ? "border-red-500"
                : "border-zinc-800"
                } bg-zinc-900`}
            >
                {leftIcon}

                <TextInput
                    className="flex-1 px-2 text-white"
                    placeholderTextColor="#71717A"
                    {...props}
                />

                {rightIcon}
            </View>

            {error && (
                <Text className="mt-2 text-sm text-red-400">
                    {error}
                </Text>
            )}
        </View>
    )
}