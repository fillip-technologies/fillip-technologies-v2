"use client";

import { useEffect, useRef } from "react";

type SmokeParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
};

export default function SmokeEffect({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;
    const startedAt = performance.now();
    const particles: SmokeParticle[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createSmoke = () => {
      const anchors = [
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.16 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
      ];

      anchors.forEach((anchor) => {
        for (let index = 0; index < 9; index += 1) {
          particles.push({
            x: anchor.x + (Math.random() - 0.5) * 56,
            y: anchor.y + (Math.random() - 0.5) * 34,
            radius: 14 + Math.random() * 24,
            alpha: 0.12 + Math.random() * 0.08,
            vx: (Math.random() - 0.5) * 0.38,
            vy: -0.25 - Math.random() * 0.28,
          });
        }
      });
    };

    const draw = (now: number) => {
      frame += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (frame === 1) createSmoke();

      const elapsed = now - startedAt;
      const life = Math.max(0, 1 - elapsed / 2000);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.radius += 0.18;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius,
        );
        gradient.addColorStop(0, `rgba(226, 232, 240, ${particle.alpha * life})`);
        gradient.addColorStop(1, "rgba(226, 232, 240, 0)");

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      if (elapsed < 2050) {
        animationId = window.requestAnimationFrame(draw);
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[998]"
      aria-hidden="true"
    />
  );
}
