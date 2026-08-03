import { Text, TextProps } from "react-native";

export function Label({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-sm font-semibold uppercase tracking-wider text-zinc-400 ${className}`}
            {...props}
        />
    );
}