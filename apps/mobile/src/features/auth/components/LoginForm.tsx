import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../validation";
import { Button, Input } from "@/components/ui";

export function LoginForm() {
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
        <>
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
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={fieldState.error?.message}
                    />
                )}
            />

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
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />

            <Button
                title="Continue"
                onPress={handleSubmit(onSubmit)}
            />
        </>
    )
}