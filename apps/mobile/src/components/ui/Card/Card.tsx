import { View } from "react-native";

import { useTheme } from "@/theme/provider";
import { Radius, Shadow } from "@/theme";

import type { CardProps } from "./Card.types";

import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

type CardComponent = React.FC<CardProps> & {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
};

const CardBase: React.FC<CardProps> = ({
    children,
    className = "",
}) => {
    const { colors } = useTheme();

    return (
        <View
            className={className}
            style={[
                {
                    backgroundColor: colors.surface,
                    borderRadius: Radius.xl,
                    borderColor: colors.border,
                    borderWidth: 1,
                    padding: 20,
                },
                Shadow.card,
            ]}
        >
            {children}
        </View>
    );
};

export const Card = CardBase as CardComponent;

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;