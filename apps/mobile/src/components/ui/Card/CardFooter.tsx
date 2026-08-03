import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
    children: ReactNode;
}

export function CardFooter({ children }: Props) {
    return (
        <View className="mt-5">
            {children}
        </View>
    );
}