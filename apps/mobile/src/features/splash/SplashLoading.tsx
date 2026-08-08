import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { useTheme } from "@/theme/provider";

export function SplashLoading() {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            {[0, 1, 2].map((i) => (
                <Animated.View
                    key={i}
                    entering={FadeIn.delay(i * 250)}
                    style={{
                        width: 8,
                        height: 8,
                        marginHorizontal: 6,
                        borderRadius: 999,
                        backgroundColor: colors.primary,
                    }}
                />
            ))}
        </View>
    );
}