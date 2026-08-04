import { useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlowBackground, Screen } from "@/components/ui";

import { onboardingData, OnboardingItem } from "../data/onboardingData";
import { OnboardingCard } from "../components/OnboardingCard";
import { PageIndicator } from "../components/PageIndicator";
import { BottomControls } from "../components/BottomControls";

export function OnboardingScreen() {
    const navigation = useNavigation<any>();

    const flatListRef = useRef<FlatList<OnboardingItem>>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(0);

    function handleScroll(
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) {
        if (width === 0) return;

        const index = Math.round(
            event.nativeEvent.contentOffset.x / width
        );

        setCurrentIndex(index);
    }

    function handleNext() {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= onboardingData.length) {
            navigation.replace("Login");
            return;
        }

        flatListRef.current?.scrollToOffset({
            offset: nextIndex * width,
            animated: true,
        });

        setCurrentIndex(nextIndex);
    }

    function handleSkip() {
        navigation.replace("Login");
    }

    return (
        <GlowBackground>
            <Screen>
                <View
                    style={styles.container}
                    onLayout={(e) => {
                        setWidth(e.nativeEvent.layout.width);
                    }}
                >
                    <FlatList
                        ref={flatListRef}
                        data={onboardingData}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        onMomentumScrollEnd={handleScroll}
                        getItemLayout={(_, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    width,
                                    flex: 1,
                                }}
                            >
                                <OnboardingCard item={item} />
                            </View>
                        )}
                    />

                    <PageIndicator
                        currentIndex={currentIndex}
                        total={onboardingData.length}
                    />

                    <BottomControls
                        isLastPage={currentIndex === onboardingData.length - 1}
                        onNext={handleNext}
                        onSkip={handleSkip}
                    />
                </View>
            </Screen>
        </GlowBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 30,
    },
});