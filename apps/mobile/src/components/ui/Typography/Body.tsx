import { Text, TextProps } from "react-native";

export function Body({
    className = "",
    ...props
}: TextProps & { className?: string }) {
    return (
        <Text
            className={`text-base leading-6 text-zinc-300 ${className}`}
            {...props}
        />
    );
}