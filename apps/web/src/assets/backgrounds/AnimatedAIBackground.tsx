import { useTheme } from "@/app/theme/ThemeProvider";

function alpha(color: string, percentage: number) {
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}

export function PremiumBackground() {
  const { colors } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              ${alpha(colors.primary, 7)},
              transparent 65%
            )
          `,
        }}
      />

      {/* Soft floating light — top left */}
      <div
        className="vm-premium-orb vm-premium-orb-one absolute"
        style={{
          width: 420,
          height: 420,
          left: "-180px",
          top: "8%",
          borderRadius: "50%",
          background: `
            radial-gradient(
              circle,
              ${alpha(colors.gradientStart, 12)} 0%,
              ${alpha(colors.gradientStart, 4)} 35%,
              transparent 70%
            )
          `,
          filter: "blur(30px)",
        }}
      />

      {/* Soft floating light — right */}
      <div
        className="vm-premium-orb vm-premium-orb-two absolute"
        style={{
          width: 520,
          height: 520,
          right: "-240px",
          top: "20%",
          borderRadius: "50%",
          background: `
            radial-gradient(
              circle,
              ${alpha(colors.gradientEnd, 11)} 0%,
              ${alpha(colors.gradientEnd, 4)} 38%,
              transparent 70%
            )
          `,
          filter: "blur(40px)",
        }}
      />

      {/* Elegant curved light */}
      <div
        className="vm-premium-ribbon absolute"
        style={{
          width: "75%",
          height: "55%",
          left: "12%",
          top: "-18%",
          borderRadius: "50%",
          border: `1px solid ${alpha(colors.primary, 7)}`,
          transform: "rotate(-8deg)",
          filter: "blur(0.2px)",
        }}
      />

      <div
        className="vm-premium-ribbon-two absolute"
        style={{
          width: "65%",
          height: "45%",
          left: "20%",
          top: "-8%",
          borderRadius: "50%",
          border: `1px solid ${alpha(colors.gradientEnd, 5)}`,
          transform: "rotate(-10deg)",
        }}
      />

      {/* Fine atmospheric light */}
      <div
        className="absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              ${alpha(colors.primary, 5)},
              transparent 68%
            )
          `,
          filter: "blur(20px)",
        }}
      />

      {/* Subtle bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent,
              ${alpha(colors.background, 35)}
            )
          `,
        }}
      />

      {/* Very subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")
          `,
        }}
      />

      <style>{`
        @keyframes vmPremiumOrbOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(55px, 35px, 0) scale(1.08);
          }
        }

        @keyframes vmPremiumOrbTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-65px, 45px, 0) scale(1.1);
          }
        }

        @keyframes vmPremiumRibbon {
          0%, 100% {
            transform: rotate(-8deg) translate3d(0, 0, 0);
          }

          50% {
            transform: rotate(-5deg) translate3d(20px, 12px, 0);
          }
        }

        @keyframes vmPremiumRibbonTwo {
          0%, 100% {
            transform: rotate(-10deg) translate3d(0, 0, 0);
          }

          50% {
            transform: rotate(-6deg) translate3d(-18px, 15px, 0);
          }
        }

        .vm-premium-orb-one {
          animation:
            vmPremiumOrbOne
            18s
            ease-in-out
            infinite;
        }

        .vm-premium-orb-two {
          animation:
            vmPremiumOrbTwo
            23s
            ease-in-out
            infinite;
        }

        .vm-premium-ribbon {
          animation:
            vmPremiumRibbon
            20s
            ease-in-out
            infinite;
        }

        .vm-premium-ribbon-two {
          animation:
            vmPremiumRibbonTwo
            26s
            ease-in-out
            infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-premium-orb-one,
          .vm-premium-orb-two,
          .vm-premium-ribbon,
          .vm-premium-ribbon-two {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}