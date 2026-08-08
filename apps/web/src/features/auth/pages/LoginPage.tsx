import { Colors } from "@virtualmento/shared";

export default function LoginPage() {
    return (
        <main
            className="flex min-h-screen items-center justify-center px-6"
            style={{
                background: Colors.background,
                color: Colors.text,
            }}
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    Welcome back
                </h1>

                <p
                    className="mt-3"
                    style={{ color: Colors.muted }}
                >
                    Your VirtualMento journey continues here.
                </p>
            </div>
        </main>
    );
}