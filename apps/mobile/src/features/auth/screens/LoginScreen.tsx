import { ScrollView } from "react-native";

import { AuthHeader, LoginForm } from "../components";
import { GlassCard, GlowBackground } from "@/components/ui";

export function LoginScreen() {
  return (
    <GlowBackground>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
        }}
      >
        <GlassCard>
          <AuthHeader />

          <LoginForm />
        </GlassCard>
      </ScrollView>
    </GlowBackground>
  );
}