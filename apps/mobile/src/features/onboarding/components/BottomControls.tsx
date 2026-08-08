import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { ArrowRight } from "lucide-react-native";

import { Radius, Spacing, Typography } from "@/theme";
import { useTheme } from "@/theme/provider";

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
    const { colors } = useTheme();

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
                    onPress={onSkip}
                    accessibilityRole="button"
                    accessibilityLabel="Skip onboarding"
                >
                    <Text
                        style={[
                            styles.skip,
                            {
                                color: colors.muted,
                            },
                        ]}
                    >
                        Skip
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.spacer} />
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
                    onPress={onNext}
                    style={[
                        styles.button,
                        {
                            backgroundColor: colors.primary,
                            shadowColor: colors.primary,
                        },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={
                        isLastPage
                            ? "Get started"
                            : "Next onboarding page"
                    }
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: colors.white,
                            },
                        ]}
                    >
                        {isLastPage ? "Get Started" : "Next"}
                    </Text>

                    <ArrowRight
                        size={20}
                        color={colors.white}
                        strokeWidth={2.5}
                    />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.lg,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    spacer: {
        width: 48,
    },

    skip: {
        fontSize: Typography.body,
        fontWeight: "600",
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Radius.full,
        paddingHorizontal: 26,
        paddingVertical: 16,

        shadowOpacity: 0.35,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },

        elevation: 10,
    },

    buttonText: {
        fontWeight: "700",
        fontSize: Typography.body,
        marginRight: Spacing.sm,
    },
});