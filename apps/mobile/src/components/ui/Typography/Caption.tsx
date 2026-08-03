import { Text, TextProps } from "react-native";

export function Caption({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-sm text-zinc-500 ${className}`}
            {...props}
        />
    );
}