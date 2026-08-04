import { View, Text } from "react-native";

export function AuthHeader() {
    return (
        <View
            style={{
                marginBottom: 36,
            }}
        >
            <Text
                style={{
                    fontSize: 38,
                    fontWeight: "800",
                    color: "white",
                }}
            >
                PitchPilot
            </Text>

            <Text
                style={{
                    marginTop: 10,
                    color: "#94A3B8",
                    fontSize: 17,
                    lineHeight: 26,
                }}
            >
                Practice interviews, negotiations and difficult conversations with AI.
            </Text>
        </View>
    );
}