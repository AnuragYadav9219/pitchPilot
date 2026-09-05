import {
  BrainCircuit,
  Check,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui";

const metrics = [
  { label: "Clarity", value: 86 },
  { label: "Technical depth", value: 78 },
  { label: "Communication", value: 91 },
];

const waveform = [
  22, 35, 52, 30, 64, 42, 76, 38, 58, 28, 50, 70, 40, 62,
  34, 55, 40, 72, 48, 30, 60, 44, 78, 54, 36, 66, 46, 58,
];

const steps = [
  {
    number: "01",
    title: "Set your target",
    description: "Choose the role you're preparing for.",
  },
  {
    number: "02",
    title: "Have the conversation",
    description: "Answer naturally while your mentor adapts.",
  },
  {
    number: "03",
    title: "Understand your performance",
    description: "See exactly what to improve next.",
  },
];

function Metric({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="min-w-0 text-(--vm-muted)">
          {label}
        </span>

        <span className="shrink-0 font-medium text-(--vm-text)">
          {value}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--vm-border)">
        <div
          className="interview-metric-fill h-full rounded-full bg-linear-to-r from-(--vm-orange) to-(--vm-primary)"
          style={{
            width: `${value}%`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function InterviewExperience() {
  return (
    <section
      id="interview-experience"
      className="relative isolate overflow-hidden border-y border-(--vm-border) bg-(--vm-background)"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-0 h-90 w-190 max-w-[90vw] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--vm-primary) 4%, transparent), transparent 70%)",
          }}
        />

        <div
          className="interview-ambient absolute -right-40 top-[35%] h-75 w-75 rounded-full blur-[110px]"
          style={{
            background:
              "color-mix(in srgb, var(--vm-orange) 3%, transparent)",
          }}
        />
      </div>

      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        {/* =====================================================
                    HEADER
                ====================================================== */}
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-(--vm-primary)">
            <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />
            Inside the experience
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-(--vm-text) sm:text-5xl lg:whitespace-nowrap lg:text-[3.5rem]">
            An interview that{" "}
            <span className="bg-linear-to-r from-(--vm-orange) via-(--vm-primary) to-(--vm-secondary) bg-clip-text text-transparent">
              responds to you.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
            VirtualMentor adapts the conversation as you answer,
            then turns your performance into clear, actionable
            feedback.
          </p>
        </div>

        {/* =====================================================
                    PRODUCT SHELL
                ====================================================== */}
        <div className="mx-auto mt-14 min-w-0 max-w-6xl">
          <div className="min-w-0 overflow-hidden rounded-[28px] border border-(--vm-border-strong) bg-(--vm-surface)/90 shadow-[0_30px_100px_color-mix(in_srgb,var(--vm-primary)_8%,transparent)] backdrop-blur-xl">
            {/* =================================================
                            TOP BAR
                        ================================================== */}
            <div className="flex h-14 min-w-0 items-center justify-between gap-4 border-b border-(--vm-border) px-5 sm:px-7">
              {/* Brand */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-(--vm-primary)/10">
                  <BrainCircuit className="h-4 w-4 text-(--vm-primary)" />
                </div>

                <span className="truncate text-sm font-semibold text-(--vm-text)">
                  VirtualMentor
                </span>
              </div>

              {/* Interview type */}
              <div className="hidden min-w-0 items-center gap-3 sm:flex">
                <span className="truncate text-xs text-(--vm-muted)">
                  Technical Interview
                </span>

                <span className="h-1 w-1 shrink-0 rounded-full bg-(--vm-border-strong)" />

                <span className="truncate text-xs font-medium text-(--vm-text-secondary)">
                  Backend Engineer
                </span>
              </div>

              {/* Live status */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="interview-pulse-ring absolute inset-0 rounded-full bg-(--vm-success)" />

                  <span className="relative h-2 w-2 rounded-full bg-(--vm-success)" />
                </span>

                <span className="text-xs font-medium text-(--vm-success)">
                  Live
                </span>
              </div>
            </div>

            {/* =================================================
                            MAIN WORKSPACE

                            minmax(0, ...) prevents grid children from
                            forcing the entire component wider.
                        ================================================== */}
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
              {/* =================================================
                                INTERVIEW WORKSPACE
                            ================================================== */}
              <div className="flex min-w-0 min-h-110 flex-col border-b border-(--vm-border) p-6 sm:p-8 lg:border-b-0 lg:border-r">
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-(--vm-muted)">
                      AI Interviewer
                    </p>

                    <p className="mt-1 text-xs text-(--vm-muted)">
                      Question 4 of 8
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-(--vm-border) px-3 py-1 text-xs text-(--vm-muted)">
                    04:32
                  </span>
                </div>

                {/* Question */}
                <div className="mt-10 min-w-0 max-w-2xl">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)/10">
                      <Sparkles className="h-4 w-4 text-(--vm-primary)" />
                    </div>

                    <span className="text-xs font-medium text-(--vm-primary)">
                      Follow-up question
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-(--vm-text) sm:text-[28px]">
                    How would you design this system to
                    handle millions of concurrent users?
                  </h3>
                </div>

                {/* =================================================
                                    RESPONSE AREA

                                    IMPORTANT:
                                    No absolute positioning here.
                                    mt-auto lets flexbox naturally push the
                                    response area to the bottom.
                                ================================================== */}
                <div className="mt-auto min-w-0 pt-10">
                  <div className="min-w-0 rounded-2xl border border-(--vm-border) bg-(--vm-surface-2)/70 p-4">
                    {/* Response header */}
                    <div className="flex min-w-0 items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-(--vm-muted)">
                          Your response
                        </p>

                        <p className="mt-1 truncate text-sm text-(--vm-text-secondary)">
                          Speaking naturally...
                        </p>
                      </div>

                      {/* Mic */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--vm-primary)">
                        <Mic className="h-4 w-4 text-white" />

                        <span className="interview-pulse-ring absolute inset-0 rounded-full border border-(--vm-primary)" />
                      </div>
                    </div>

                    {/* =================================================
                                            WAVEFORM
                                        ================================================== */}
                    <div className="mt-5 flex h-10 w-full items-center gap-0.75 overflow-hidden">
                      {waveform.map((height, index) => (
                        <span
                          key={index}
                          className="interview-wave-bar h-full w-0.75 shrink-0 rounded-full bg-(--vm-primary)/70"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 45}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Status */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="truncate text-[11px] text-(--vm-muted)">
                        Voice input active
                      </span>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--vm-primary)" />

                        <span className="text-[11px] font-medium text-(--vm-primary)">
                          Adapting
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                                PERFORMANCE PANEL
                            ================================================== */}
              <div className="min-w-0 bg-(--vm-surface-2)/45 p-6 sm:p-8">
                {/* Score header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-(--vm-muted)">
                      Your performance
                    </p>

                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-(--vm-text)">
                      82
                      <span className="text-lg text-(--vm-muted)">
                        /100
                      </span>
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--vm-success)/10">
                    <TrendingUp className="h-4 w-4 text-(--vm-success)" />
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-10 space-y-6">
                  {metrics.map((metric, index) => (
                    <Metric
                      key={metric.label}
                      {...metric}
                      delay={index * 160}
                    />
                  ))}
                </div>

                {/* AI Insight */}
                <div className="mt-10 border-t border-(--vm-border) pt-7">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 shrink-0 text-(--vm-primary)" />

                    <span className="text-xs font-semibold text-(--vm-text)">
                      AI insight
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-(--vm-muted)">
                    Strong problem-solving explanation.
                    Your technical reasoning was clear,
                    but your scalability trade-offs could
                    be more specific.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-(--vm-success)">
                    <Check className="h-3.5 w-3.5 shrink-0" />

                    <span>Clear reasoning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
                    PROCESS
                ====================================================== */}
        <div className="mx-auto mt-12 grid max-w-5xl min-w-0 border-y border-(--vm-border) md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`min-w-0 py-6 md:px-7 ${index !== 0
                  ? "border-t border-(--vm-border) md:border-l md:border-t-0"
                  : ""
                }`}
            >
              <div className="flex gap-4">
                <span className="shrink-0 text-xs font-semibold text-(--vm-primary)">
                  {step.number}
                </span>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-(--vm-text)">
                    {step.title}
                  </h4>

                  <p className="mt-1.5 text-xs leading-5 text-(--vm-muted)">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}