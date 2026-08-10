import { ScrollView, View } from "react-native";

import {
    AuthHeader,
    RegisterForm,
    SocialLogin,
} from "../components";

import {
    GlassCard,
    GlowBackground,
} from "@/components/ui";

import { Brand, Spacing } from "@/theme";

export function RegisterScreen() {
    return (
        <GlowBackground>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    paddingHorizontal: Spacing.lg,
                    paddingVertical: Spacing.xxl,
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
                        <AuthHeader
                            title="Create your account."
                            description={`Start your ${Brand.name} journey and build real-world confidence.`}
                        />

                        <RegisterForm
                            onLogin={() => navigation.navigate("Login")}
                        />

                        <View
                            style={{
                                marginTop: Spacing.xl,
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