import { useTheme } from "@/app/theme/ThemeProvider";

export default function LoginPage() {
    const {colors} = useTheme();

    return (
        <main
            className="flex min-h-screen items-center justify-center px-6"
            style={{
                background: colors.background,
                color: colors.text,
            }}
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    Welcome back
                </h1>

                <p
                    className="mt-3"
                    style={{ color: colors.muted }}
                >
                    Your VirtualMento journey continues here.
                </p>
            </div>
        </main>
    );
}