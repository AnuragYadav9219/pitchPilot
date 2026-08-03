import { Text } from "react-native";

type Props = {
    title: string;
};

export function SectionTitle({ title }: Props) {
    return (
        <Text className="mb-4 mt-8 px-6 text-2xl font-bold text-white">
            {title}
        </Text>
    );
}