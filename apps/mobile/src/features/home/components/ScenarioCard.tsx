import { Pressable, Text, View } from "react-native";

import { ChevronRight } from "lucide-react-native";

import { Scenario } from "../data/scenarios";

interface Props {
    scenario: Scenario;
}

export function ScenarioCard({ scenario }: Props) {
    const Icon = scenario.Icon;

    return (
        <Pressable
            className="mx-6 mb-4 overflow-hidden rounded-3xl bg-zinc-900 active:opacity-80"
        >
            <View className="flex-row items-center p-5">

                <View
                    className="h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: `${scenario.color}20`,
                    }}
                >
                    <Icon
                        size={30}
                        color={scenario.color}
                        strokeWidth={2}
                    />
                </View>

                <View className="ml-5 flex-1">

                    <Text className="text-lg font-bold text-white">
                        {scenario.title}
                    </Text>

                    <Text className="mt-1 text-zinc-400">
                        {scenario.description}
                    </Text>

                    <View className="mt-3 flex-row items-center">

                        <View className="rounded-full bg-zinc-800 px-3 py-1">
                            <Text className="text-xs text-zinc-300">
                                {scenario.difficulty}
                            </Text>
                        </View>

                        <Text className="ml-3 text-zinc-500">
                            {scenario.duration}
                        </Text>

                    </View>

                </View>

                <ChevronRight
                    color="#71717A"
                    size={22}
                />

            </View>
        </Pressable>
    );
}