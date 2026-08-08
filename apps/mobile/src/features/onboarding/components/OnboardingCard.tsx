import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Spacing, Typography } from "@/theme";
import { useTheme } from "@/theme/provider";

import { OnboardingItem } from "../data/onboardingData";

interface Props {
    item: OnboardingItem;
}

export function OnboardingCard({ item }: Props) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {/* Illustration */}
            <Animated.View
                entering={FadeInDown.delay(100).duration(700)}
                style={styles.imageContainer}
            >
                {item.image ? (
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    <View
                        style={[
                            styles.placeholder,
                            {
                                backgroundColor: colors.surface,
                            },
                        ]}
                    />
                )}
            </Animated.View>

            {/* Content */}
            <Animated.View
                entering={FadeInDown.delay(250).duration(700)}
                style={styles.content}
            >
                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {item.title}
                </Text>

                <Text
                    style={[
                        styles.description,
                        {
                            color: colors.textSecondary,
                        },
                    ]}
                >
                    {item.description}
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Spacing.xl,
    },

    imageContainer: {
        width: "100%",
        height: 320,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "90%",
        height: "90%",
    },

    placeholder: {
        width: 260,
        height: 260,
        borderRadius: 130,
    },

    content: {
        marginTop: 40,
        alignItems: "center",
    },

    title: {
        fontSize: Typography.h1,
        fontWeight: "800",
        textAlign: "center",
        lineHeight: 40,
    },

    description: {
        marginTop: 20,
        fontSize: Typography.body,
        textAlign: "center",
        lineHeight: 28,
        maxWidth: 320,
    },
});