import { Check, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui";
import type { useTheme } from "@/app/theme/ThemeProvider";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

const areas = [
  ["Communication", 91, "+8%"],
  ["Technical Depth", 78, "+12%"],
  ["Clarity", 86, "+6%"],
  ["Confidence", 84, "+10%"],
] as const;

function Metric({
  label,
  score,
  change,
  index,
  colors,
}: {
  label: string;
  score: number;
  change: string;
  index: number;
  colors: ThemeColors;
}) {
  return (
    <div className="feedback-metric" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-sm font-medium" style={{ color: colors.text }}>
            {label}
          </span>
          <span
            className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
            style={{
              backgroundColor: `color-mix(in srgb, ${colors.success} 9%, transparent)`,
              color: colors.success,
            }}
          >
            {change}
          </span>
        </div>
        <span className="shrink-0 text-sm font-semibold" style={{ color: colors.text }}>
          {score}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.border }}>
        <div
          className="feedback-metric-fill h-full rounded-full"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
            animationDelay: `${index * 120}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function FeedbackSection({ colors }: { colors: ThemeColors }) {
  return (
    <section
      id="feedback"
      className="relative isolate overflow-hidden border-y py-16 sm:py-20 lg:py-22"
      style={{ borderColor: colors.border, backgroundColor: colors.backgroundAlt }}
    >
      {/* BACKGROUND */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-75 w-170 max-w-[90vw] -translate-x-1/2 rounded-full blur-[110px]"
          style={{
            background: `radial-gradient(ellipse, color-mix(in srgb, ${colors.primary} 3.5%, transparent), transparent 70%)`,
          }}
        />
        <div
          className="feedback-ambient absolute -left-40 bottom-0 h-65 w-65 rounded-full blur-[100px]"
          style={{ background: `color-mix(in srgb, ${colors.orange} 2.5%, transparent)` }}
        />
        <div
          className="feedback-ambient-reverse absolute -right-40 top-[35%] h-70 w-70 rounded-full blur-[110px]"
          style={{ background: `color-mix(in srgb, ${colors.peach} 2.5%, transparent)` }}
        />
      </div>

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium" style={{ color: colors.primary }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
            Feedback that helps you improve
          </div>

          <h2
            className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:whitespace-nowrap lg:text-[3.35rem]"
            style={{ color: colors.text }}
          >
            Don't just know your score.{" "}
            <span style={{ color: colors.secondary }}>Know how to improve.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 sm:text-lg" style={{ color: colors.muted }}>
            Every practice session becomes clear, actionable feedback so you know what worked and what to focus on next.
          </p>
        </div>

        {/* FEEDBACK PRODUCT UI */}
        <div className="mx-auto mt-10 min-w-0 max-w-5xl">
          <div
            className="min-w-0 overflow-hidden rounded-3xl border"
            style={{
              borderColor: colors.borderStrong,
              backgroundColor: colors.surface,
              boxShadow: `0 24px 80px color-mix(in srgb, ${colors.primary} 6%, transparent)`,
            }}
          >
            {/* TOP BAR */}
            <div className="flex h-12 items-center justify-between gap-4 border-b px-5 sm:px-6" style={{ borderColor: colors.border }}>
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `color-mix(in srgb, ${colors.primary} 9%, transparent)` }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: colors.primary }} />
                </div>
                <span className="truncate text-xs font-semibold" style={{ color: colors.text }}>
                  Interview feedback
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.success }} />
                <span className="text-[11px] font-medium" style={{ color: colors.success }}>
                  Session complete
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)]">
              {/* SCORE */}
              <div className="min-w-0 border-b p-5 sm:p-6 lg:border-b-0 lg:border-r" style={{ borderColor: colors.border }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: colors.primary }}>
                      Performance
                    </p>
                    <div className="mt-3 flex items-end gap-1.5">
                      <span className="text-5xl font-semibold tracking-tighter" style={{ color: colors.text }}>
                        86
                      </span>
                      <span className="pb-1.5 text-base" style={{ color: colors.muted }}>
                        /100
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `color-mix(in srgb, ${colors.success} 9%, transparent)` }}
                  >
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: colors.success }} />
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mt-5">
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.border }}>
                    <div
                      className="feedback-score-fill h-full rounded-full"
                      style={{
                        width: "86%",
                        background: `linear-gradient(90deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px]" style={{ color: colors.muted }}>Overall performance</span>
                    <span className="text-[10px] font-semibold" style={{ color: colors.success }}>Strong</span>
                  </div>
                </div>

                {/* Strength */}
                <div className="mt-6 border-t pt-5" style={{ borderColor: colors.border }}>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" style={{ color: colors.success }} />
                    <span className="text-xs font-semibold" style={{ color: colors.text }}>Strong communication</span>
                  </div>
                  <p className="mt-2 text-xs leading-5" style={{ color: colors.muted }}>
                    Your answers were natural, structured, and easy to follow.
                  </p>
                </div>
              </div>

              {/* BREAKDOWN */}
              <div className="min-w-0 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold" style={{ color: colors.text }}>Performance breakdown</h3>
                    <p className="mt-1 text-[11px]" style={{ color: colors.muted }}>Your performance across key areas</p>
                  </div>

                  <div
                    className="hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 sm:flex"
                    style={{ borderColor: colors.border, backgroundColor: colors.background }}
                  >
                    <TrendingUp className="h-3 w-3" style={{ color: colors.success }} />
                    <span className="text-[10px] font-medium" style={{ color: colors.success }}>Improving</span>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {areas.map(([label, score, change], index) => (
                    <Metric key={label} label={label} score={score} change={change} index={index} colors={colors} />
                  ))}
                </div>

                {/* Recommendation */}
                <div className="mt-6 flex items-start gap-2.5 border-t pt-5" style={{ borderColor: colors.border }}>
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: colors.primary }} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold" style={{ color: colors.text }}>Next focus</p>
                    <p className="mt-1 text-[11px] leading-5" style={{ color: colors.muted }}>
                      Add measurable technical outcomes to make your answers more impactful.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-7 flex items-center justify-center gap-2">
          <Check className="h-3.5 w-3.5 shrink-0" style={{ color: colors.success }} />
          <p className="text-xs" style={{ color: colors.muted }}>
            Every session gives you a clearer path to your next interview.
          </p>
        </div>
      </Container>
    </section>
  );
}