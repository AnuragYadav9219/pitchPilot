import { View, Text } from "react-native";

export function SplashScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Text className="text-5xl font-bold text-white">
                PitchPilot
            </Text>

            <Text className="mt-3 text-zinc-400">
                Practice. Improve. Win.
            </Text>
        </View>
    );
}