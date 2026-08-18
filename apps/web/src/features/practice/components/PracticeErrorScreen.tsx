import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button, Card } from "@/components/ui";

export function PracticeErrorScreen() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-dvh items-center justify-center bg-(--vm-background) px-4 text-(--vm-text)">
            <Card className="w-full max-w-md p-7 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-(--vm-danger)/10 text-(--vm-danger)">
                    <Sparkles size={22} />
                </div>

                <h1 className="mt-4 text-lg font-semibold">
                    Unable to load session
                </h1>

                <p className="mt-2 text-sm leading-6 text-(--vm-muted)">
                    We couldn't restore this practice conversation. It may no longer exist or you may not have access to it.
                </p>

                <Button
                    className="mt-6 w-full"
                    onClick={() => navigate("/history")}
                >
                    Back to history
                </Button>
            </Card>
        </main>
    );
}