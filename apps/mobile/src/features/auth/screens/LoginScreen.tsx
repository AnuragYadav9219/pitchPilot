import { View } from "react-native";

import { Screen } from "@/components/ui";
import { AuthHeader, LoginForm } from "../components";

export function LoginScreen() {
    return (
        <Screen>
            <View className="flex-1 justify-center px-6">
                <AuthHeader />
                <LoginForm />
            </View>
        </Screen>
    );
}