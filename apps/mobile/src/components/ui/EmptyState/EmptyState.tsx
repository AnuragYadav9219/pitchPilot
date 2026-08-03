import { View } from "react-native";
import { Button } from "../Button";
import { Heading, Body } from "../Typography";
import { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionText,
    onAction,
}: EmptyStateProps) {
    return (
        <View className="flex-1 items-center justify-center px-8">

            <View className="mb-6 rounded-full bg-zinc-900 p-6">
                <Icon size={48} color="#6D5DFB" />
            </View>

            <Heading className="text-center">
                {title}
            </Heading>

            <Body className="mt-3 text-center text-zinc-400">
                {description}
            </Body>

            {actionText && (
                <View className="mt-8 w-full">
                    <Button
                        title={actionText}
                        onPress={onAction}
                    />
                </View>
            )}

        </View>
    );
}