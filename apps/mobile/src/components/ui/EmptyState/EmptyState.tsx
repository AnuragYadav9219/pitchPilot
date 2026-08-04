import { View } from "react-native";

import { Button } from "../Button";
import { Heading, Body } from "../Typography";
import { EmptyStateProps } from "./EmptyState.types";

import { Colors, Radius, Spacing } from "@/theme";

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionText,
    onAction,
}: EmptyStateProps) {
    return (
        <View
            className="flex-1 items-center justify-center px-8"
            style={{
                paddingHorizontal: Spacing.xl,
            }}
        >
            <View
                style={{
                    width: 96,
                    height: 96,
                    borderRadius: Radius.full,
                    backgroundColor: Colors.surface,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: Spacing.lg,
                }}
            >
                <Icon
                    size={44}
                    color={Colors.primary}
                />
            </View>

            <Heading className="text-center">
                {title}
            </Heading>

            <Body
                className="text-center"
                style={{
                    marginTop: Spacing.sm,
                    color: Colors.muted,
                    maxWidth: 300,
                }}
            >
                {description}
            </Body>

            {actionText && (
                <View
                    style={{
                        marginTop: Spacing.xl,
                        width: "100%",
                    }}
                >
                    <Button
                        title={actionText}
                        onPress={onAction}
                    />
                </View>
            )}
        </View>
    );
}