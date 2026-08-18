import { Brand } from "@virtualmento/shared";
import {
    BadgeCheck,
    Mail,
    ShieldCheck,
} from "lucide-react";

interface ProfileHeaderProps {
    fullName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
}

export function ProfileHeader({
    fullName,
    email,
    emailVerified,
    enabled,
}: ProfileHeaderProps) {
    const initials =
        fullName
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    return (
        <section className="relative overflow-hidden rounded-3xl border border-(--vm-border) bg-(--vm-surface)">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-(--vm-primary)/10 blur-3xl" />

            <div className="relative p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-(--vm-primary)/10 text-2xl font-bold text-(--vm-primary) ring-8 ring-(--vm-primary)/5">
                            {initials}
                        </div>

                        {enabled && (
                            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-(--vm-surface) bg-(--vm-success)">
                                <BadgeCheck
                                    size={13}
                                    className="text-white"
                                />
                            </span>
                        )}
                    </div>

                    {/* Identity */}
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                                {fullName}
                            </h1>

                            {emailVerified && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-(--vm-success)/10 px-2.5 py-1 text-[10px] font-semibold text-(--vm-success)">
                                    <ShieldCheck size={12} />
                                    Verified
                                </span>
                            )}
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-(--vm-muted)">
                            <Mail size={14} />
                            <span className="truncate">
                                {email}
                            </span>
                        </div>

                        <p className="mt-3 max-w-xl text-xs leading-5 text-(--vm-muted)">
                            Your {Brand.name} profile helps your AI mentor personalize practice sessions and recommendations.
                        </p>
                    </div>

                    {/* Account status */}
                    <div className="hidden shrink-0 sm:block">
                        <div className="rounded-2xl border border-(--vm-border) bg-(--vm-background) px-4 py-3">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-(--vm-muted)">
                                Account
                            </p>

                            <div className="mt-1.5 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-(--vm-success)" />
                                <span className="text-xs font-semibold text-(--vm-text)">
                                    {enabled
                                        ? "Active"
                                        : "Disabled"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}