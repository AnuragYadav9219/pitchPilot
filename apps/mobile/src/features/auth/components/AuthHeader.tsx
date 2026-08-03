import { View } from "react-native";

import {
    Heading,
    Body,
} from "@/components/ui";

export function AuthHeader() {
    return (
        <View className="mb-10">
            <Heading>
                Welcome Back
            </Heading>

            <Body className="mt-3">
                Let's continue improving your communication.
            </Body>
        </View>
    );
}