import { View, StyleSheet } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

import { Colors } from "@/theme";

interface Props {
    currentIndex: number;
    total: number;
}

interface DotProps {
    active: boolean;
}

function Dot({ active }: DotProps) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(active ? 34 : 10),
            backgroundColor: interpolateColor(
                active ? 1 : 0,
                [0, 1],
                [Colors.borderStrong, Colors.primary]
            ),
            opacity: withSpring(active ? 1 : 0.5),
        };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function PageIndicator({
    currentIndex,
    total,
}: Props) {
    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map((_, index) => (
                <Dot
                    key={index}
                    active={index === currentIndex}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 28,
    },

    dot: {
        height: 10,
        borderRadius: 999,
        marginHorizontal: 6,
    },
});