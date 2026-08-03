import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SplashScreen } from "@/features/splash/SplashScreen";
import { LoginScreen } from "@/features/auth/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
