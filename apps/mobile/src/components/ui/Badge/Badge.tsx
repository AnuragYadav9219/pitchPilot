import { Text, View } from "react-native";

interface BadgeProps {
    text: string;
}

export function Badge({ text }: BadgeProps) {
    return (
        <View className="rounded-full bg-zinc-800 px-3 py-1">
            <Text className="text-xs font-medium text-zinc-300">
                {text}
            </Text>
        </View>
    );
}