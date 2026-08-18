import { AlertCircle } from "lucide-react";

export function ProfileError() {
    return (
        <main className="flex min-h-full items-center justify-center bg-(--vm-background) px-4">
            <div className="max-w-sm text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <AlertCircle size={20} />
                </div>

                <h1 className="mt-4 text-sm font-semibold text-(--vm-text)">
                    Unable to load your profile
                </h1>

                <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
                    We couldn't retrieve your account information. Please try again.
                </p>
            </div>
        </main>
    );
}