import { useEffect, useRef } from "react";

interface HeroBackgroundProps {
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
}

const PARTICLE_COUNT = 50;

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep particle state persistent across renders without triggering effects
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      id: index,
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.2 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    // --- Draw Helpers ---
    const drawAmbientGlow = () => {
      const glow = context.createRadialGradient(
        width * 0.8,
        height * 0.35,
        0,
        width * 0.8,
        height * 0.35,
        width * 0.6
      );

      glow.addColorStop(0, "rgba(240, 100, 73, 0.22)");
      glow.addColorStop(0.4, "rgba(249, 115, 22, 0.08)");
      glow.addColorStop(1, "rgba(249, 115, 22, 0)");

      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const drawWaves = () => {
      for (let wave = 0; wave < 4; wave += 1) {
        context.beginPath();

        for (let x = -50; x <= width + 50; x += 12) {
          const normalizedX = x / width;
          const y =
            height * (0.45 + wave * 0.06) +
            Math.sin(normalizedX * 6 + time + wave * 0.8) * (30 + wave * 10) +
            Math.sin(normalizedX * 14 - time * 0.6) * 14;

          if (x === -50) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(249, 115, 22, 0)");
        gradient.addColorStop(0.2, "rgba(249, 115, 22, 0.2)");
        gradient.addColorStop(0.5, "rgba(240, 100, 73, 0.35)");
        gradient.addColorStop(0.8, "rgba(194, 65, 45, 0.2)");
        gradient.addColorStop(1, "rgba(194, 65, 45, 0)");

        context.strokeStyle = gradient;
        context.lineWidth = wave === 1 ? 2 : 1.2;
        context.globalAlpha = 0.95 - wave * 0.15;
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        const x = particle.x * width;
        const y =
          ((particle.y +
            time * particle.speed +
            Math.sin(time + particle.phase) * 0.02) %
            1) *
          height;

        const alpha =
          0.3 + Math.sin(time * 2.5 + particle.phase) * 0.2;

        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(240, 100, 73, ${alpha})`;
        context.fill();
      });
    };

    const drawCentralPulse = () => {
      const pulse = (Math.sin(time * 2) + 1) / 2;
      const centerX = width * 0.8;
      const centerY = height * 0.35;

      const rings = [
        { radius: 80 + pulse * 20, color: "rgba(240, 100, 73, ", opacity: 0.06 },
        { radius: 130 + pulse * 30, color: "rgba(249, 115, 22, ", opacity: 0.035 },
        { radius: 190 + pulse * 40, color: "rgba(240, 100, 73, ", opacity: 0.015 },
      ];

      rings.forEach(({ radius, color, opacity }) => {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.strokeStyle = `${color}${opacity + pulse * opacity})`;
        context.lineWidth = 1.2;
        context.stroke();
      });
    };

    const render = () => {
      time += 0.008;
      context.clearRect(0, 0, width, height);

      drawAmbientGlow();
      drawWaves();
      drawParticles();
      drawCentralPulse();

      animationFrame = requestAnimationFrame(render);
    };

    handleResize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base Background */}
      <div className="absolute inset-0 bg-(--vm-background,#0d0d11)" />

      {/* Atmospheric Glow Orbs */}
      <div className="absolute -right-20 -top-20 h-125 w-125 animate-pulse rounded-full bg-linear-to-br from-(--vm-coral,#f06449)/20 to-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-10 right-[25%] h-87.5 w-87.5 rounded-full bg-orange-600/10 blur-[100px]" />

      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Grid Pattern Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="vm-hero-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              className="text-(--vm-coral,#f06449)"
              strokeWidth="0.8"
              opacity="0.08"
            />
          </pattern>

          <radialGradient id="vm-grid-mask" cx="70%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="vm-grid-fade">
            <rect width="100%" height="100%" fill="url(#vm-grid-mask)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#vm-hero-grid)"
          mask="url(#vm-grid-fade)"
        />
      </svg>

      {/* Vignettes & Readability Gradients */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-(--vm-background,#0d0d11) to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-(--vm-background,#0d0d11) to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-(--vm-background,#0d0d11) via-(--vm-background,#0d0d11)/80 to-transparent" />
    </div>
  );
}