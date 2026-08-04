import { View } from "react-native";
import { CardProps } from "./Card.types";
import { Colors, Radius, Shadow } from "@/theme";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

type CardComponent = React.FC<CardProps> & {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
}

const CardBase: React.FC<CardProps> = ({
    children,
    className = "",
}) => {
    return (
        <View
            className={className}
            style={[
                {
                    backgroundColor: Colors.surface,
                    borderRadius: Radius.xl,
                    borderColor: Colors.border,
                    borderWidth: 1,
                    padding: 20,
                },
                Shadow.card,
            ]}
        >
            {children}
        </View>
    );
}

export const Card = CardBase as CardComponent;

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;