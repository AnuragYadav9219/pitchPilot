import { Text, TextProps } from "react-native";

export function Display({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-5xl font-extrabold tracking-tight text-white ${className}`}
            {...props}
        />
    );
}