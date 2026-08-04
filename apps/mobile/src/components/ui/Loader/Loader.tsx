import { ActivityIndicator, View } from "react-native";

import { Colors } from "@/theme";

interface LoaderProps {
    fullScreen?: boolean;
}

export function Loader({
    fullScreen = false,
}: LoaderProps) {
    return (
        <View
            className={`
        items-center
        justify-center
        ${fullScreen ? "flex-1" : ""}
      `}
        >
            <ActivityIndicator
                size="large"
                color={Colors.primary}
            />
        </View>
    );
}