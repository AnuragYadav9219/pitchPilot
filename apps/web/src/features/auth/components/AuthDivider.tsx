export function AuthDivider() {
    return (
        <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-(--vm-border)" />

            <span className="text-xs font-medium uppercase tracking-wider text-(--vm-muted)">
                Or continue with
            </span>

            <div className="h-px flex-1 bg-(--vm-border)" />
        </div>
    );
}