import { Image, type ImageStyle } from "react-native";

import { Brand } from "@virtualmento/shared";

import logo from "@/assets/images/logo.png";

interface LogoProps {
    size?: number;
    style?: ImageStyle;
}

export function Logo({
    size = 96,
    style,
}: LogoProps) {
    return (
        <Image
            source={logo}
            accessibilityLabel={`${Brand.name} logo`}
            resizeMode="contain"
            style={[
                {
                    width: size,
                    height: size,
                },
                style,
            ]}
        />
    );
}