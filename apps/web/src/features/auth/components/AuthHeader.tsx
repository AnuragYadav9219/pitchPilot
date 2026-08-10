import { Logo } from "@/components/branding/Logo";
import { Brand } from "@virtualmento/shared";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
    title: string;
    description: string;
}

export function AuthHeader({
    title,
    description,
}: AuthHeaderProps) {
    return (
        <div className="text-center">
            <div className="mb-8 flex justify-center">
                <Logo size="lg" />
            </div>

            <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-(--vm-muted) transition-colors hover:text-(--vm-text)"
            >
                <ArrowLeft
                    size={15}
                    aria-hidden="true"
                />
                Back to {Brand.name}
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-(--vm-text) sm:text-4xl">
                {title}
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--vm-muted) sm:text-base">
                {description}
            </p>
        </div>
    )
}