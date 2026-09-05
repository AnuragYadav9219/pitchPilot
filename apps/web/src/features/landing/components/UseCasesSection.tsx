import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Handshake,
  MessageSquareText,
  RefreshCcw,
} from "lucide-react";
import { Container } from "@/components/ui";
import type { useTheme } from "@/app/theme/ThemeProvider";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

const cases = [
  {
    icon: Code2,
    tag: "Engineering",
    title: "Technical Interviews",
    description:
      "Practice coding, system design, backend, frontend, and technical discussion rounds.",
  },
  {
    icon: BriefcaseBusiness,
    tag: "Behavioral",
    title: "Behavioral Interviews",
    description:
      "Build stronger stories and practice questions about your experience and decisions.",
  },
  {
    icon: RefreshCcw,
    tag: "Career Growth",
    title: "Career Switch",
    description:
      "Prepare for the questions that come with moving into a new role or industry.",
  },
  {
    icon: GraduationCap,
    tag: "Students",
    title: "Campus Placements",
    description:
      "Build confidence before your first interviews and communicate your strengths.",
  },
  {
    icon: Handshake,
    tag: "Leadership",
    title: "Leadership & Management",
    description:
      "Practice ownership, decision-making, conflict, and team leadership conversations.",
  },
  {
    icon: MessageSquareText,
    tag: "Communication",
    title: "Presentations & Communication",
    description:
      "Improve how clearly and confidently you explain ideas and technical concepts.",
  },
];

export function UseCasesSection({ colors }: { colors: ThemeColors }) {
  return (
    <section
      id="use-cases"
      className="relative isolate overflow-hidden border-y py-16 sm:py-20 lg:py-24"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      {/* SUBTLE BACKGROUND */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-80 w-180 max-w-[90vw] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(ellipse, color-mix(in srgb, ${colors.primary} 3%, transparent), transparent 70%)`,
          }}
        />
        <div
          className="use-cases-ambient absolute -left-32 top-[45%] h-70 w-70 rounded-full blur-[110px]"
          style={{ background: `color-mix(in srgb, ${colors.orange} 2.5%, transparent)` }}
        />
        <div
          className="use-cases-ambient-reverse absolute -right-32 bottom-[5%] h-75 w-75 rounded-full blur-[120px]"
          style={{ background: `color-mix(in srgb, ${colors.peach} 2.5%, transparent)` }}
        />
      </div>

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium" style={{ color: colors.primary }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
            Practice for what matters
          </div>

          <h2
            className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:whitespace-nowrap lg:text-[3.35rem]"
            style={{ color: colors.text }}
          >
            One mentor.{" "}
            <span style={{ color: colors.primary }}>Every career conversation.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 sm:text-lg" style={{ color: colors.muted }}>
            From your first interview to your next big career move, practice the conversations that matter.
          </p>
        </div>

        {/* USE CASE GRID */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="use-case-card group relative min-w-0 overflow-hidden rounded-[20px] border p-5"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  animationDelay: `${index * 70}ms`,
                }}
              >
                {/* Subtle accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${colors.primary} 12%, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative flex h-9 w-9 items-center justify-center rounded-xl border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${colors.primary} 7%, transparent)`,
                    borderColor: `color-mix(in srgb, ${colors.primary} 14%, transparent)`,
                    color: colors.primary,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Tag */}
                <span
                  className="relative mt-5 block text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: colors.secondary }}
                >
                  {item.tag}
                </span>

                {/* Title */}
                <h3
                  className="relative mt-1.5 text-[17px] font-semibold tracking-[-0.02em]"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative mt-2 text-[13px] leading-5" style={{ color: colors.muted }}>
                  {item.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="use-case-line absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: colors.primary }}
                />
              </div>
            );
          })}
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colors.primary }} />
          <p className="text-xs sm:text-sm" style={{ color: colors.muted }}>
            Whatever you're preparing for, practice with a mentor that adapts to you.
          </p>
        </div>
      </Container>
    </section>
  );
}