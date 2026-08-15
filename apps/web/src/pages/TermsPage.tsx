import { Link } from "react-router-dom";

import { Brand } from "@virtualmento/shared";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-(--vm-background) px-6 py-16 text-(--vm-text)">
            <div className="mx-auto max-w-3xl">
                <Link
                    to="/register"
                    className="text-sm text-(--vm-primary) hover:underline"
                >
                    ← Back to registration
                </Link>

                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">
                        {Brand.name}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Terms of Service
                    </h1>

                    <p className="mt-4 leading-7 text-(--vm-muted)">
                        These terms govern your use of{" "}
                        {Brand.name}. The full terms will
                        be published here before public
                        launch.
                    </p>
                </div>
            </div>
        </main>
    );
}