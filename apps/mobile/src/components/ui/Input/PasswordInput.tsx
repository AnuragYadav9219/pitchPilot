import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

import { Pressable } from "react-native";

import { Input } from "./Input";
import { InputProps } from "./Input.types";

export function PasswordInput(props: InputProps) {
    const [secure, setSecure] = useState(true);

    return (
        <Input
            {...props}
            secureTextEntry={secure}
            rightIcon={
                <Pressable
                    onPress={() => setSecure(!secure)}
                >
                    {secure ? (
                        <EyeOff color="#A1A1AA" size={20} />
                    ) : (
                        <Eye color="#A1A1AA" size={20} />
                    )}
                </Pressable>
            }
        />
    );
}