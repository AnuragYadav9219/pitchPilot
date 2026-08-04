import { Text, TextProps } from "react-native";

export function Heading({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-4xl font-extrabold text-white tracking-tight ${className}`}
            {...props}
        />
    );
}