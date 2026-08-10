import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    useNavigation,
} from "@react-navigation/native";

import type {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Animated, {
    FadeIn,
    FadeInDown,
} from "react-native-reanimated";

import { GlowBackground } from "@/components/ui";
import { useTheme } from "@/theme/provider";

import type { RootStackParamList } from "@/navigation/types";

import { SplashLogo } from "./SplashLogo";
import { SplashLoading } from "./SplashLoading";
import { Brand } from "@virtualmento/shared";

type SplashNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Splash"
    >;

export function SplashScreen() {
    const navigation =
        useNavigation<SplashNavigationProp>();

    const { colors } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Onboarding");
        }, 2200);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <GlowBackground>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Animated.View
                    entering={FadeIn.duration(900)}
                >
                    <SplashLogo />
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(300).duration(700)}
                    style={{
                        marginTop: 28,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 38,
                            fontWeight: "800",
                            color: colors.text,
                            letterSpacing: 1,
                        }}
                    >
                        {Brand.name}
                    </Text>

                    <Text
                        style={{
                            marginTop: 10,
                            color: colors.muted,
                            fontSize: 16,
                        }}
                    >
                        {Brand.tagline}
                    </Text>
                </Animated.View>

                <View
                    style={{
                        position: "absolute",
                        bottom: 80,
                    }}
                >
                    <SplashLoading />
                </View>
            </SafeAreaView>
        </GlowBackground>
    );
}