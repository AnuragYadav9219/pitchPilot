import { FlatList, View } from "react-native";


import { scenarios } from "./data/scenarios";
import { ContinueCard, GreetingHeader, ScenarioCard, SectionTitle } from "./components";

export function HomeScreen() {
    return (
        <View className="flex-1 bg-black">

            <FlatList
                data={scenarios}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
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