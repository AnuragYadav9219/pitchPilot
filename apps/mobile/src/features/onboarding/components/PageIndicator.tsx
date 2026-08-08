import { StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

import { useTheme } from "@/theme/provider";

interface Props {
    currentIndex: number;
    total: number;
}

interface DotProps {
    active: boolean;
    borderColor: string;
    primaryColor: string;
}

function Dot({
    active,
    borderColor,
    primaryColor,
}: DotProps) {
    const animatedStyle = useAnimatedStyle(
        () => ({
            width: withSpring(active ? 34 : 10),

            backgroundColor: interpolateColor(
                active ? 1 : 0,
                [0, 1],
                [borderColor, primaryColor],
            ),

            opacity: withSpring(
                active ? 1 : 0.5,
            ),
        }),
        [active, borderColor, primaryColor],
    );

    return (
        <Animated.View
            style={[
                styles.dot,
                animatedStyle,
            ]}
        />
    );
}

export function PageIndicator({
    currentIndex,
    total,
}: Props) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map(
                (_, index) => (
                    <Dot
                        key={index}
                        active={
                            index === currentIndex
                        }
                        borderColor={
                            colors.borderStrong
                        }
                        primaryColor={
                            colors.primary
                        }
                    />
                ),
            )}
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