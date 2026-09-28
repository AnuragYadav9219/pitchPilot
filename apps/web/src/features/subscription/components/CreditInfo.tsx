import { Info, LockKeyhole, Sparkles } from "lucide-react";

export function CreditInfo() {
    return (
        <div className="group mt-4 rounded-xl border border-(--vm-border) bg-(--vm-surface-2)/30 px-4 py-3.5 transition-all duration-200 hover:border-(--vm-primary)/30 hover:bg-(--vm-surface-2)/60">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10 shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <Info className="h-3.5 w-3.5 text-(--vm-primary)" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-(--vm-text)">How credits work</p>
                        <Sparkles className="h-3 w-3 text-(--vm-primary) transition-transform duration-300 group-hover:rotate-12" />
                    </div>

                    <p className="mt-1 text-[11px] leading-relaxed text-(--vm-muted)">
                        Credits are used for AI-powered actions. Some operations temporarily reserve credits while they are processing.
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-medium text-(--vm-muted)">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-(--vm-primary)/10">
                                <Sparkles className="h-2.5 w-2.5 text-(--vm-primary)" />
                            </span>
                            Available = ready to use
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-(--vm-warning)/10">
                                <LockKeyhole className="h-2.5 w-2.5 text-(--vm-warning)" />
                            </span>
                            Reserved = processing
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}