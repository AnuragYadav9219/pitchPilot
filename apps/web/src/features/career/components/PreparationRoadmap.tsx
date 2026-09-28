// import { ArrowRight, ListChecks } from "lucide-react";

// interface PreparationRoadmapProps {
//   steps: string[];
// }

// export function PreparationRoadmap({ steps }: PreparationRoadmapProps) {
//   return (
//     <section className="vm-card overflow-hidden">
//       {/* Header */}
//       <div className="border-b border-(--vm-border) p-5 sm:p-6">
//         <div className="flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--vm-radius-md) border border-(--vm-primary)/15 bg-(--vm-primary)/10 text-(--vm-primary)">
//             <ListChecks size={18} />
//           </div>
//           <div>
//             <h2 className="text-base font-bold text-(--vm-text)">
//               Your preparation roadmap
//             </h2>
//             <p className="mt-1 text-xs leading-5 text-(--vm-muted)">
//               Turn today's market signals into your next actions.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Steps */}
//       <div className="space-y-2 p-5 sm:p-6">
//         {steps.map((step, index) => (
//           <div
//             key={`${step}-${index}`}
//             className="group flex items-start gap-3 rounded-(--vm-radius-md) border border-(--vm-border) bg-(--vm-surface-2) p-4 transition-all duration-200 hover:border-(--vm-primary)/25 hover:bg-(--vm-surface-3)"
//           >
//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10 text-xs font-bold text-(--vm-primary)">
//               {index + 1}
//             </div>

//             <div className="min-w-0 flex-1">
//               <p className="text-sm leading-6 text-(--vm-text-secondary)">
//                 {step}
//               </p>
//             </div>

//             <ArrowRight
//               size={15}
//               className="mt-1 shrink-0 text-(--vm-muted) transition-all duration-200 group-hover:translate-x-1 group-hover:text-(--vm-primary)"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




















import { CheckCircle2, ListChecks } from "lucide-react";

interface PreparationRoadmapProps {
    steps: string[];
}

export function PreparationRoadmap({
    steps,
}: PreparationRoadmapProps) {
    return (
        <section className="vm-card overflow-hidden">
            {/* Header */}

            <div className="border-b border-(--vm-border) p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-(--vm-radius-md)
                            border
                            border-(--vm-primary)
                            bg-(--vm-primary)
                            text-white
                        "
                    >
                        <ListChecks size={18} />
                    </div>

                    <div className="min-w-0">
                        <h2
                            className="
                                text-base
                                font-bold
                                text-(--vm-text)
                            "
                        >
                            Your preparation roadmap
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                leading-5
                                text-(--vm-muted)
                            "
                        >
                            Turn today's market signals into
                            your next actions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Roadmap */}

            <div className="p-5 sm:p-6">
                {steps.length === 0 ? (
                    <div
                        className="
                            rounded-(--vm-radius-md)
                            border
                            border-(--vm-border)
                            bg-(--vm-surface-2)
                            p-5
                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm
                                text-(--vm-muted)
                            "
                        >
                            No preparation steps available yet.
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        {steps.map((step, index) => {
                            const isLast =
                                index === steps.length - 1;

                            return (
                                <div
                                    key={`${step}-${index}`}
                                    className="relative flex gap-4"
                                >
                                    {/* Connector */}

                                    {!isLast && (
                                        <div
                                            className="
                                                absolute
                                                left-4
                                                top-9
                                                h-[calc(100%-1rem)]
                                                w-px
                                                bg-(--vm-border)
                                            "
                                        />
                                    )}

                                    {/* Step Number */}

                                    <div
                                        className="
                                            relative
                                            z-10
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-(--vm-primary)
                                            bg-(--vm-surface-solid)
                                            text-xs
                                            font-bold
                                            text-(--vm-primary)
                                        "
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Step Content */}

                                    <div
                                        className={`
                                            min-w-0
                                            flex-1
                                            ${isLast ? "" : "pb-5"}
                                        `}
                                    >
                                        <div
                                            className="
                                                rounded-(--vm-radius-md)
                                                border
                                                border-(--vm-border)
                                                bg-(--vm-surface-2)
                                                p-4
                                                transition-all
                                                duration-200
                                                hover:border-(--vm-primary)
                                                hover:bg-(--vm-surface-3)
                                            "
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="min-w-0 flex-1">
                                                    <div
                                                        className="
                                                            mb-1
                                                            text-[10px]
                                                            font-bold
                                                            uppercase
                                                            tracking-[0.14em]
                                                            text-(--vm-primary)
                                                        "
                                                    >
                                                        Step{" "}
                                                        {String(
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </div>

                                                    <p
                                                        className="
                                                            text-sm
                                                            leading-6
                                                            text-(--vm-text-secondary)
                                                        "
                                                    >
                                                        {step}
                                                    </p>
                                                </div>

                                                <CheckCircle2
                                                    size={17}
                                                    className="
                                                        mt-0.5
                                                        shrink-0
                                                        text-(--vm-muted)
                                                        transition-colors
                                                        duration-200
                                                        group-hover:text-(--vm-primary)
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}