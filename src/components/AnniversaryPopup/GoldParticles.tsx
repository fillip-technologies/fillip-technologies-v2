"use client";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: 16 + ((index * 37) % 68),
  top: 12 + ((index * 29) % 66),
  delay: (index % 6) * 0.22,
  duration: 2.6 + (index % 5) * 0.32,
  size: 3 + (index % 3),
}));

export default function GoldParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="anniversary-gold-particle absolute rounded-full bg-amber-300/80"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
