import { Text } from "react-native";

import { useTheme } from "@/theme/provider";

interface SectionTitleProps {
    title: string;
}

export function SectionTitle({
    title,
}: SectionTitleProps) {
    const { colors } = useTheme();

    return (
        <Text
            style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "700",
                marginTop: 24,
                marginBottom: 12,
            }}
        >
            {title}
        </Text>
    );
}