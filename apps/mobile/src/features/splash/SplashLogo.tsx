import { useEffect } from "react";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
} from "react-native-reanimated";

import { Logo } from "@/components/branding";

export function SplashLogo() {
    const scale = useSharedValue(0.8);

    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withSpring(1, {
                    damping: 12,
                    stiffness: 120,
                }),
                withSpring(0.95, {
                    damping: 12,
                    stiffness: 120,
                }),
            ),
            -1,
            true,
        );

        return () => {
            scale.value = 0.8;
        };
    }, [scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: scale.value,
            },
        ],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Logo size={96} />
        </Animated.View>
    );
}