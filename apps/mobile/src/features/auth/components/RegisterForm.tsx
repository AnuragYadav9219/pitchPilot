import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pressable, Text, View } from "react-native";

import {
    Body,
    Button,
    Input,
} from "@/components/ui";

import { useTheme } from "@/theme/provider";

import {
    Spacing,
    Typography,
} from "@/theme";

import {
    registerSchema,
    type RegisterSchema,
} from "../validation";

interface RegisterFormProps {
    onLogin?: () => void;
}

export function RegisterForm({
    onLogin,
}: RegisterFormProps) {
    const { colors } = useTheme();

    const {
        control,
        handleSubmit,
        watch,
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    function onSubmit(data: RegisterSchema) {
        console.log(data);
    }

    return (
        <View>
            {/* NAME */}

            <Controller
                control={control}
                name="name"
                render={({
                    field: {
                        onChange,
                        value,
                    },
                    fieldState,
                }) => (
                    <Input
                        label="Name"
                        placeholder="Enter your name"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        error={
                            fieldState.error?.message
                        }
                    />
                )}
            />

            {/* EMAIL */}

            <Controller
                control={control}
                name="email"
                render={({
                    field: {
                        onChange,
                        value,
                    },
                    fieldState,
                }) => (
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        error={
                            fieldState.error?.message
                        }
                    />
                )}
            />

            {/* PASSWORD */}

            <Controller
                control={control}
                name="password"
                render={({
                    field: {
                        onChange,
                        value,
                    },
                    fieldState,
                }) => (
                    <Input
                        label="Password"
                        placeholder="Create a password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        error={
                            fieldState.error?.message
                        }
                    />
                )}
            />

            {/* PASSWORD HINT */}

            {password.length > 0 && (
                <Text
                    style={{
                        marginTop: -Spacing.sm,
                        marginBottom: Spacing.md,
                        color: colors.muted,
                        fontSize: Typography.tiny,
                    }}
                >
                    Use a strong password with at least 8 characters.
                </Text>
            )}

            {/* CONFIRM PASSWORD */}

            <Controller
                control={control}
                name="confirmPassword"
                render={({
                    field: {
                        onChange,
                        value,
                    },
                    fieldState,
                }) => (
                    <Input
                        label="Confirm password"
                        placeholder="Confirm your password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        error={
                            fieldState.error?.message
                        }
                    />
                )}
            />

            {/* CREATE ACCOUNT */}

            <Button
                title="Create account"
                onPress={handleSubmit(onSubmit)}
            />

            {/* LOGIN */}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Spacing.xl,
                }}
            >
                <Body
                    style={{
                        color: colors.muted,
                    }}
                >
                    Already have an account?
                </Body>

                <Pressable
                    onPress={onLogin}
                    style={({ pressed }) => ({
                        marginLeft: 6,
                        opacity: pressed ? 0.65 : 1,
                    })}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontSize: Typography.body,
                            fontWeight: "700",
                        }}
                    >
                        Log in
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}