import { useTheme } from "@/app/theme/ThemeProvider";
import { useEffect, useRef } from "react";

interface AIListeningBackgroundProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
}

const PARTICLE_COUNT = 45;

export function AIListeningBackground({ className = "" }: AIListeningBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { colors } = useTheme();

  const particlesRef = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.15 + 0.03,
      phase: Math.random() * Math.PI * 2,
    })),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const drawOrb = () => {
      const x = width * 0.78;
      const y = height * 0.45;
      const pulse = (Math.sin(time * 2) + 1) / 2;
      const radius = 55 + pulse * 8;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
      gradient.addColorStop(0, colors.glowCoral);
      gradient.addColorStop(0.35, colors.glowOrange);
      gradient.addColorStop(1, colors.transparent);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(x - 10, y - 10, 0, x, y, radius);
      core.addColorStop(0, colors.peach);
      core.addColorStop(0.45, colors.primary);
      core.addColorStop(1, colors.terracotta);

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawListeningRings = () => {
      const x = width * 0.78;
      const y = height * 0.45;
      const pulse = (Math.sin(time * 2) + 1) / 2;

      for (let i = 0; i < 4; i++) {
        const radius = 80 + i * 45 + pulse * 25;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? colors.coral : colors.orange;
        ctx.globalAlpha = 0.14 - i * 0.025;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawVoiceWave = () => {
      const centerY = height * 0.45;
      ctx.beginPath();

      for (let x = width * 0.48; x < width * 0.98; x += 6) {
        const normalized = (x - width * 0.48) / (width * 0.5);
        const amplitude = 18 + Math.sin(time * 3) * 8;
        const y = centerY + Math.sin(normalized * 18 - time * 3) * amplitude * (0.25 + normalized);

        if (x === width * 0.48) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const gradient = ctx.createLinearGradient(width * 0.48, 0, width, 0);
      gradient.addColorStop(0, colors.transparent);
      gradient.addColorStop(0.4, colors.glowOrange);
      gradient.addColorStop(0.7, colors.glowCoral);
      gradient.addColorStop(1, colors.transparent);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        const x = particle.x * width;
        const y = ((particle.y + time * particle.speed) % 1) * height;
        const alpha = 0.2 + Math.sin(time * 2 + particle.phase) * 0.15;

        ctx.globalAlpha = Math.max(0.05, alpha);
        ctx.fillStyle = colors.coral;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      drawParticles();
      drawListeningRings();
      drawVoiceWave();
      drawOrb();

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [colors]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ backgroundColor: colors.background }} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Content readability */}
      <div
        className="absolute inset-y-0 left-0 w-[65%]"
        style={{
          background: `linear-gradient(90deg, ${colors.background}, ${colors.background}cc, ${colors.transparent})`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: `linear-gradient(0deg, ${colors.background}, ${colors.transparent})`,
        }}
      />
    </div>
  );
}