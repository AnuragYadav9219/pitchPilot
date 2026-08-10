import { ScrollView, View } from "react-native";

import {
    useNavigation,
} from "@react-navigation/native";

import type {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
    AuthHeader,
    LoginForm,
    SocialLogin,
} from "../components";

import {
    GlassCard,
    GlowBackground,
} from "@/components/ui";

import type {
    RootStackParamList,
} from "@/navigation/types";

type LoginNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Login"
    >;

export function LoginScreen() {
    const navigation =
        useNavigation<LoginNavigationProp>();

    return (
        <GlowBackground>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        maxWidth: 520,
                        alignSelf: "center",
                    }}
                >
                    <GlassCard>
                        <AuthHeader />

                        <LoginForm
                            onForgotPassword={() => {
                                // Build this screen later.
                            }}
                            onSignUp={() => {
                                navigation.navigate(
                                    "Register",
                                );
                            }}
                        />

                        <View
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <SocialLogin />
                        </View>
                    </GlassCard>
                </View>
            </ScrollView>
        </GlowBackground>
    );
}