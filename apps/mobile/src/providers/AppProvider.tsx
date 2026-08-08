import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { AppNavigator } from "@/navigation/AppNavigator";
import { ThemeProvider } from "@/theme/provider";

export function AppProvider() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <ThemeProvider>
                        <AppNavigator />
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}