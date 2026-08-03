import { Search } from "lucide-react-native";

import { Input } from "./Input";
import { InputProps } from "./Input.types";

export function SearchInput(props: InputProps) {
    return (
        <Input
            placeholder="Search scenarios..."
            leftIcon={
                <Search
                    size={20}
                    color="#71717A"
                />
            }
            {...props}
        />
    );
}