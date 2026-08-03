import { View, Text } from "react-native";

export function GreetingHeader() {
    return (
        <View className="mt-8 px-6">
            <Text className="text-4xl font-bold text-white">
                Good Evening
            </Text>

            <Text className="mt-2 text-zinc-400">
                Ready to improve today?
            </Text>
        </View>
    );
}