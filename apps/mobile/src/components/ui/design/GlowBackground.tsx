import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
    children: ReactNode;
}

export function GlowBackground({ children }: Props) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#030712", "#09090B", "#030712"]}
                style={StyleSheet.absoluteFill}
            />

            <View style={[styles.orb, styles.orb1]} />
            <View style={[styles.orb, styles.orb2]} />

            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    orb: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 999,
        opacity: 0.25,
    },

    orb1: {
        top: -60,
        right: -40,
        backgroundColor: "#2563EB",
    },

    orb2: {
        bottom: -80,
        left: -60,
        backgroundColor: "#06B6D4",
    },
});