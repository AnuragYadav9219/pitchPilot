import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Animated, {
    FadeIn,
    FadeInDown,
} from "react-native-reanimated";

import { GlowBackground } from "@/components/ui";
import { Colors } from "@/theme";
import { Brand } from "@/config/brand";

import { SplashLogo } from "./SplashLogo";
import { SplashLoading } from "./SplashLoading";

export function SplashScreen() {
    const navigation = useNavigation<any>();

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
                <Animated.View entering={FadeIn.duration(900)}>
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
                            color: Colors.text,
                            letterSpacing: 1,
                        }}
                    >
                        {Brand.name}
                    </Text>

                    <Text
                        style={{
                            marginTop: 10,
                            color: Colors.muted,
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