import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SplashScreen } from "@/features/splash/SplashScreen";
import { LoginScreen } from "@/features/auth/screens/LoginScreen";
import { OnboardingScreen } from "@/features/onboarding/screens/OnboardingScreen";
import { RegisterScreen } from "@/features/auth/screens/RegisterScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />

        {/* ADD THIS */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}