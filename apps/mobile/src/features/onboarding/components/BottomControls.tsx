import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { ArrowRight } from "lucide-react-native";

import { Colors, Radius, Spacing, Typography } from "@/theme";

interface BottomControlsProps {
    isLastPage: boolean;
    onNext: () => void;
    onSkip: () => void;
}

export function BottomControls({
    isLastPage,
    onNext,
    onSkip,
}: BottomControlsProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            entering={FadeInUp.delay(150).duration(600)}
            style={styles.container}
        >
            {!isLastPage ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        console.log("SKIP");
                        onSkip();
                    }}
                >
                    <Text style={styles.skip}>
                        Skip
                    </Text>
                </TouchableOpacity>
            ) : (
                <View />
            )}

            <Animated.View style={animatedStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => {
                        scale.value = withSpring(0.96);
                    }}
                    onPressOut={() => {
                        scale.value = withSpring(1);
                    }}
                    onPress={() => {
                        console.log("NEXT");
                        onNext();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isLastPage ? "Get Started" : "Next"}
                    </Text>

                    <ArrowRight
                        size={20}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    skip: {
        color: Colors.muted,
        fontSize: Typography.body,
        fontWeight: "600",
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        borderRadius: Radius.full,
        paddingHorizontal: 26,
        paddingVertical: 16,
        shadowColor: Colors.primary,
        shadowOpacity: 0.35,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 10,
    },

    buttonText: {
        color: Colors.white,
        fontWeight: "700",
        fontSize: Typography.body,
        marginRight: 8,
    },
});