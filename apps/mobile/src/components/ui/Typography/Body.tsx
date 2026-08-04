import { Text, TextProps } from "react-native";

export function Body({
  className = "",
  ...props
}: TextProps & { className?: string }) {
  return (
    <Text
      className={`text-base text-muted leading-6 ${className}`}
      {...props}
    />
  );
}