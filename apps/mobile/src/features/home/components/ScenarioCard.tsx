import {
    Pressable,
    Text,
    View,
} from "react-native";

import { useTheme } from "@/theme/provider";

interface Scenario {
    id: string;
    title: string;
    description: string;
}

interface ScenarioCardProps {
    scenario: Scenario;
}

export function ScenarioCard({
    scenario,
}: ScenarioCardProps) {
    const { colors } = useTheme();

    return (
        <Pressable
            style={{
                marginBottom: 12,
                padding: 18,
                borderRadius: 20,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: 17,
                    fontWeight: "700",
                }}
            >
                {scenario.title}
            </Text>

            <Text
                style={{
                    color: colors.muted,
                    marginTop: 6,
                    lineHeight: 20,
                }}
            >
                {scenario.description}
            </Text>
        </Pressable>
    );
}