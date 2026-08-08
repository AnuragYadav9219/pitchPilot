import { FlatList, StyleSheet, View } from "react-native";

import { useTheme } from "@/theme/provider";

import { ThemeToggle } from "@/components/common/ThemeToggle";

import { scenarios } from "./data/scenarios";
import {
    ContinueCard,
    GreetingHeader,
    ScenarioCard,
    SectionTitle,
} from "./components";

export function HomeScreen() {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <View style={styles.toggle}>
                <ThemeToggle />
            </View>

            <FlatList
                data={scenarios}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                ListHeaderComponent={
                    <>
                        <GreetingHeader />

                        <ContinueCard />

                        <SectionTitle title="Popular Scenarios" />
                    </>
                }
                renderItem={({ item }) => (
                    <ScenarioCard scenario={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        paddingBottom: 30,
    },

    toggle: {
        alignItems: "flex-end",
        paddingHorizontal: 20,
        paddingTop: 16,
    },
});