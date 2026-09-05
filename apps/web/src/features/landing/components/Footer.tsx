import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui";
import type { useTheme } from "@/app/theme/ThemeProvider";
import { Brand } from "@virtualmentor/shared";
import { Logo } from "@/components/branding/Logo";

type ThemeColors = ReturnType<typeof useTheme>["colors"];

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
];

const accountLinks = [
  { label: "Sign In", to: "/login" },
  { label: "Create Account", to: "/register" },
];

export function Footer({ colors }: { colors: ThemeColors }) {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        borderColor: colors.border,
        backgroundColor: colors.surface,
      }}
    >
      {/* SUBTLE BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="footer-ambient absolute -right-32 -top-32 h-65 w-65 rounded-full blur-[110px]"
          style={{
            background: `color-mix(in srgb, ${colors.primary} 3%, transparent)`,
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* MAIN FOOTER */}
        <div className="grid gap-8 py-9 sm:py-10 md:grid-cols-[minmax(0,1.5fr)_minmax(140px,.7fr)_minmax(140px,.7fr)] md:gap-12">
          {/* BRAND */}
          <div className="min-w-0">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5"
            >
              <Logo showName size="sm" />
            </Link>

            <p
              className="mt-3 max-w-sm text-xs leading-5 sm:text-sm"
              style={{ color: colors.muted }}
            >
              Your AI mentor for realistic interview practice,
              personalized feedback, and career growth.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: colors.text }}
            >
              Product
            </p>

            <nav className="mt-3 flex flex-col gap-2">
              {productLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="footer-link w-fit text-xs sm:text-sm"
                  style={{ color: colors.muted }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ACCOUNT */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: colors.text }}
            >
              Account
            </p>

            <nav className="mt-3 flex flex-col gap-2">
              {accountLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="footer-link w-fit text-xs sm:text-sm"
                  style={{ color: colors.muted }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="flex flex-col gap-3 border-t py-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: colors.border }}
        >
          <p className="text-[11px]" style={{ color: colors.muted }}>
            © {new Date().getFullYear()} {Brand.name}. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex w-fit items-center gap-1.5 text-[11px] transition-colors duration-200"
            style={{ color: colors.muted }}
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
}