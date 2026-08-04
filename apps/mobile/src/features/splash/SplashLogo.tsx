import { Image } from "react-native";
import { useEffect } from "react";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
} from "react-native-reanimated";

import { Brand } from "@/config/brand";

export function SplashLogo() {
    const scale = useSharedValue(0.8);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withSpring(1),
                withSpring(0.95)
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: scale.value,
            },
        ],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Image
                source={Brand.logo}
                resizeMode="contain"
                style={{
                    width: Brand.logoSize,
                    height: Brand.logoSize,
                }}
            />
        </Animated.View>
    );
}