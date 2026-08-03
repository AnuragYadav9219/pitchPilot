import { View } from "react-native";
import { CardProps } from "./Card.types";
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
        <View className={`rounded-3xl border border-zinc-800 bg-zinc-900 p-5 ${className}`}>
            {children}
        </View>
    );
}

export const Card = CardBase as CardComponent;

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;