import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    Pressable,
    Text,
    View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginSchema,
} from "../validation";

import {
    Body,
    Button,
    Input,
} from "@/components/ui";

import { useTheme } from "@/theme/provider";

interface LoginFormProps {
    onForgotPassword?: () => void;
    onSignUp?: () => void;
}

export function LoginForm({
    onForgotPassword,
    onSignUp,
}: LoginFormProps) {
    const { colors } = useTheme();

    const {
        control,
        handleSubmit,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginSchema) {
        console.log(data);
    }

    return (
        <View>
            <Controller
                control={control}
                name="email"
                render={({
                    field: { onChange, value },
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
                        error={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({
                    field: { onChange, value },
                    fieldState,
                }) => (
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />

            <Pressable
                onPress={onForgotPassword}
                style={({ pressed }) => ({
                    alignSelf: "flex-end",
                    marginTop: 0,
                    marginBottom: 16,
                    opacity: pressed ? 0.65 : 1,
                })}
            >
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 13,
                        fontWeight: "600",
                    }}
                >
                    Forgot password?
                </Text>
            </Pressable>

            <Button
                title="Continue →"
                onPress={handleSubmit(onSubmit)}
            />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 18,
                }}
            >
                <Body
                    style={{
                        color: colors.muted,
                        fontSize: 13,
                    }}
                >
                    Don't have an account?
                </Body>

                <Pressable
                    onPress={onSignUp}
                    style={({ pressed }) => ({
                        marginLeft: 5,
                        opacity: pressed ? 0.65 : 1,
                    })}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontSize: 13,
                            fontWeight: "700",
                        }}
                    >
                        Create one
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}