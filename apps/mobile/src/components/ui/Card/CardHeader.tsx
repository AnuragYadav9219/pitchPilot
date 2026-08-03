import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
    children: ReactNode;
}

export function CardHeader({ children }: Props) {
    return (
        <View className="mb-4">
            {children}
        </View>
    );
}