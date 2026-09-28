interface CareerStatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
}

export function CareerStatCard({
    icon,
    label,
    value,
}: CareerStatCardProps) {
    return (
        <div className="vm-card group relative overflow-hidden p-4 transition-all duration-300 hover:-translate-y-0.5">
            {/* Glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-(--vm-primary)/5 blur-2xl transition-all duration-500 group-hover:bg-(--vm-primary)/10" />

            <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-(--vm-radius-sm) border border-(--vm-primary)/15 bg-(--vm-primary)/10 text-(--vm-primary)">
                    {icon}
                </div>

                <div className="mt-4">
                    <p className="text-2xl font-bold tracking-tight text-(--vm-text) sm:text-3xl">
                        {value.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}