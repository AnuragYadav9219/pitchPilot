import { Text, TextProps } from "react-native";

export function Heading({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-3xl font-bold tracking-tight text-white ${className}`}
            {...props}
        />
    );
}