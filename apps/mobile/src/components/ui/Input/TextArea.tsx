import { Input } from "./Input";
import { InputProps } from "./Input.types";

export function TextArea(props: InputProps) {
    return (
        <Input
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={{
                minHeight: 120,
            }}
            {...props}
        />
    );
}