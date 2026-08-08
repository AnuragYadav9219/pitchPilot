import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "../validation";

import {
  Body,
  Button,
  Input,
} from "@/components/ui";

import { useTheme } from "@/theme/provider";
import { Spacing, Typography } from "@/theme";

export function LoginForm() {
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
            placeholder="Enter your password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={
              fieldState.error?.message
            }
          />
        )}
      />

      {/* FORGOT PASSWORD */}

      <Pressable
        style={{
          alignSelf: "flex-end",
          marginBottom: Spacing.lg,
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: Typography.small,
            fontWeight: "600",
          }}
        >
          Forgot password?
        </Text>
      </Pressable>

      {/* LOGIN */}

      <Button
        title="Continue →"
        onPress={handleSubmit(onSubmit)}
      />

      {/* GOOGLE */}

      <Pressable
        style={{
          height: 56,
          marginTop: Spacing.lg,

          borderWidth: 1,
          borderColor: colors.border,

          borderRadius: 20,

          justifyContent: "center",
          alignItems: "center",

          backgroundColor: colors.surface,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: Typography.body,
            fontWeight: "600",
          }}
        >
          Continue with Google
        </Text>
      </Pressable>

      {/* SIGN UP */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: Spacing.xl,
        }}
      >
        <Body
          style={{
            color: colors.muted,
          }}
        >
          Don't have an account?
        </Body>

        <Pressable>
          <Text
            style={{
              marginLeft: 6,
              color: colors.primary,
              fontWeight: "700",
              fontSize: Typography.body,
            }}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>

      {/* TRUST */}

      <Text
        style={{
          marginTop: Spacing.xxl,
          textAlign: "center",
          color: colors.muted,
          fontSize: Typography.tiny,
        }}
      >
        🔒 Secure authentication • Your data stays private
      </Text>
    </View>
  );
}