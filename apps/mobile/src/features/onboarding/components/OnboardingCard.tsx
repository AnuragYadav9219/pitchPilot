import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Colors, Typography, Spacing } from "@/theme";
import { OnboardingItem } from "../data/onboardingData";

interface Props {
    item: OnboardingItem;
}

export function OnboardingCard({ item }: Props) {
    return (
        <View style={styles.container}>
            {/* Illustration */}

            <Animated.View
                entering={FadeInDown.delay(100).duration(700)}
                style={styles.imageContainer}
            >
                {/* <Image
                    source={item.image}
                    resizeMode="contain"
                    style={styles.image}
                /> */}

                {item.image ? (
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    <View
                        style={{
                            width: 260,
                            height: 260,
                            borderRadius: 130,
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                    />
                )}

            </Animated.View>

            {/* Content */}

            <Animated.View
                entering={FadeInDown.delay(250).duration(700)}
                style={styles.content}
            >
                <Text style={styles.title}>
                    {item.title}
                </Text>

                <Text style={styles.description}>
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

    content: {
        marginTop: 40,
        alignItems: "center",
    },

    title: {
        color: Colors.text,
        fontSize: Typography.h1,
        fontWeight: "800",
        textAlign: "center",
        lineHeight: 40,
    },

    description: {
        marginTop: 20,
        color: Colors.textSecondary,
        fontSize: Typography.body,
        textAlign: "center",
        lineHeight: 28,
        maxWidth: 320,
    },
});