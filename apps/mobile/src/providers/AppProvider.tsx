import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { AppNavigator } from "@/navigation/AppNavigator";

export function AppProvider() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <AppNavigator />
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}