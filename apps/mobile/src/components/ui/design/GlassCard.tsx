import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

interface Props {
    children: ReactNode;
}

export function GlassCard({ children }: Props) {
    return (
        <BlurView intensity={40} tint="dark" style={styles.card}>
            {children}
        </BlurView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 32,
        padding: 28,
        overflow: "hidden",

        backgroundColor: "rgba(255,255,255,0.05)",

        borderWidth: 1,

        borderColor: "rgba(255,255,255,0.08)",
    },
});