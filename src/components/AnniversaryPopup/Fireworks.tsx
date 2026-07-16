"use client";

import { useEffect, useRef } from "react";

type FireworkParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
};

const COLORS = ["#f4c76b", "#ffffff", "#5da8ff"];
const MAX_PARTICLES = 900;

export default function Fireworks({
  active,
  reducedMotion,
  onComplete,
}: {
  active: boolean;
  reducedMotion: boolean;
  onComplete?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || reducedMotion) {
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationId = 0;
    let running = true;
    const particles: FireworkParticle[] = [];
    const timers: number[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const burst = (x: number, y: number, intensity = 1) => {
      const count = Math.round(32 * intensity);
      for (let index = 0; index < count; index += 1) {
        if (particles.length > MAX_PARTICLES) particles.shift();

        const angle = (Math.PI * 2 * index) / count;
        const speed = 1.05 + Math.random() * (1.9 * intensity);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[index % COLORS.length],
          radius: 1.4 + Math.random() * 1.6,
        });
      }
    };

    const randomBurstPosition = () => {
      const marginX = window.innerWidth * 0.08;
      const marginY = window.innerHeight * 0.08;
      return {
        x: marginX + Math.random() * (window.innerWidth - marginX * 2),
        y: marginY + Math.random() * (window.innerHeight - marginY * 2),
      };
    };

    const launch = () => {
      const positions = [
        { x: window.innerWidth * 0.18, y: window.innerHeight * 0.18, delay: 0, intensity: 1.1 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.12, delay: 150, intensity: 1.25 },
        { x: window.innerWidth * 0.82, y: window.innerHeight * 0.18, delay: 300, intensity: 1.1 },
        { x: window.innerWidth * 0.32, y: window.innerHeight * 0.24, delay: 560, intensity: 0.85 },
        { x: window.innerWidth * 0.68, y: window.innerHeight * 0.24, delay: 720, intensity: 0.85 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.22, delay: 940, intensity: 1 },
        { x: window.innerWidth * 0.24, y: window.innerHeight * 0.14, delay: 1260, intensity: 0.78 },
        { x: window.innerWidth * 0.76, y: window.innerHeight * 0.14, delay: 1420, intensity: 0.78 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1, delay: 1660, intensity: 1.15 },
      ];

      positions.forEach((position) => {
        timers.push(
          window.setTimeout(() => {
            burst(position.x, position.y, position.intensity);
          }, position.delay),
        );
      });

      for (let index = 0; index < 58; index += 1) {
        const delay = 2100 + index * 900 + Math.random() * 340;
        timers.push(
          window.setTimeout(() => {
            const position = randomBurstPosition();
            burst(position.x, position.y, 0.72 + Math.random() * 0.44);
          }, delay),
        );
      }
    };

    const keepCracking = () => {
      const crack = () => {
        if (!running) return;
        const burstCount = Math.random() > 0.68 ? 2 : 1;

        for (let index = 0; index < burstCount; index += 1) {
          const position = randomBurstPosition();
          burst(position.x, position.y, 0.62 + Math.random() * 0.42);
        }

        timers.push(window.setTimeout(crack, 780 + Math.random() * 460));
      };

      timers.push(window.setTimeout(crack, 2200));
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.018;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.alpha -= 0.013;

        context.globalAlpha = Math.max(particle.alpha, 0);
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        if (particles[index].alpha <= 0) particles.splice(index, 1);
      }

      if (running) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    launch();
    keepCracking();
    animationId = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 2500);
    timers.push(completeTimer);

    return () => {
      running = false;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [active, onComplete, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[999]"
      aria-hidden="true"
    />
  );
}
