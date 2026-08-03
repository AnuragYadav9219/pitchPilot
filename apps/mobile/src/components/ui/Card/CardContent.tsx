import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
    children: ReactNode;
}

export function CardContent({ children }: Props) {
    return (
        <View className="flex-1">
            {children}
        </View>
    );
}