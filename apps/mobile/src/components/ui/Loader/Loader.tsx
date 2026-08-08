import { useTheme } from "@/theme/provider";
import { ActivityIndicator, View } from "react-native";

interface LoaderProps {
    fullScreen?: boolean;
}

export function Loader({
    fullScreen = false,
}: LoaderProps) {
    const {colors} = useTheme();

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
                color={colors.primary}
            />
        </View>
    );
}