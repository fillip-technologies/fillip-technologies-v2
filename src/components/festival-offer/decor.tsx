/**
 * Inline SVG festive motifs for the /festival-offer landing page.
 *
 * These are drawn rather than loaded as images on purpose: the project ships
 * no Diwali assets, and inline vectors keep the page free of extra requests,
 * broken-image risk and layout shift. All are decorative, so they carry
 * aria-hidden and never sit in the accessibility tree.
 */

type DecorProps = {
  className?: string;
};

/** Corner mandala — a restrained concentric motif for section edges. */
export function MandalaCorner({ className = "" }: DecorProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.9">
        <circle cx="100" cy="100" r="34" />
        <circle cx="100" cy="100" r="52" />
        <circle cx="100" cy="100" r="72" strokeDasharray="3 7" />
        <circle cx="100" cy="100" r="92" strokeDasharray="1 9" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={100 + Math.cos(angle) * 36}
              y1={100 + Math.sin(angle) * 36}
              x2={100 + Math.cos(angle) * 70}
              y2={100 + Math.sin(angle) * 70}
            />
          );
        })}
      </g>
      <g fill="currentColor" opacity="0.5">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={100 + Math.cos(angle) * 52}
              cy={100 + Math.sin(angle) * 52}
              r="2.5"
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Fine-line lotus alpana, used as a low-contrast Durga Puja accent. */
export function PujaAlpana({ className = "" }: DecorProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={`${className} motion-safe:animate-[spin_48s_linear_infinite]`}
    >
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.85">
        <circle cx="120" cy="120" r="22" />
        <circle cx="120" cy="120" r="46" strokeDasharray="2 6" />
        <circle cx="120" cy="120" r="91" strokeDasharray="1 8" />
        {Array.from({ length: 8 }).map((_, index) => (
          <path
            key={index}
            d="M120 40C145 62 148 83 120 103C92 83 95 62 120 40Z"
            transform={`rotate(${index * 45} 120 120)`}
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <path
            key={`inner-${index}`}
            d="M120 92C132 102 133 112 120 121C107 112 108 102 120 92Z"
            transform={`rotate(${index * 45} 120 120)`}
          />
        ))}
      </g>
      <g fill="currentColor" opacity="0.7">
        {Array.from({ length: 16 }).map((_, index) => {
          const angle = (index * 22.5 * Math.PI) / 180;
          return (
            <circle
              key={index}
              cx={120 + Math.cos(angle) * 91}
              cy={120 + Math.sin(angle) * 91}
              r="2"
            />
          );
        })}
      </g>
    </svg>
  );
}

/** A single lit diya with its flame — used sparingly as an accent. */
/** Hand-lined peacock with dotted feather eyes, inspired by Mithila painting. */
export function MadhubaniPeacock({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 190 220" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
        {Array.from({ length: 7 }).map((_, index) => (
          <g key={index} transform={`rotate(${(index - 3) * 11} 91 141)`}>
            <path d="M94 145C68 123 56 88 68 44C97 62 114 95 104 132Z" />
            <path d="M94 133C80 107 76 81 80 59" />
            <ellipse cx="84" cy="79" rx="8" ry="12" />
            <circle cx="84" cy="79" r="3.2" fill="currentColor" />
            <circle cx="84" cy="79" r="1" fill="#FDFBF5" stroke="none" />
          </g>
        ))}
        <path d="M87 147C98 126 123 120 141 134C158 148 146 164 125 169C108 173 94 162 87 147Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M130 143C142 124 153 102 149 82C147 69 139 64 131 70C124 76 128 87 139 91" />
        <circle cx="147" cy="75" r="5.7" fill="currentColor" fillOpacity="0.15" />
        <circle cx="148" cy="74" r="1.2" fill="currentColor" />
        <path d="m152 75 13 3-12 3M145 68l-1-10m5 11 4-9m-9 12-7-8M107 169l-4 12m19-11 2 11m-25 0h28" />
        <path d="M105 139c8-6 18-8 27-5m-31 13c9-5 19-6 29-3m-25 11c8-3 15-3 22-1" strokeDasharray="1 4" />
      </g>
      <g fill="currentColor">
        {Array.from({ length: 7 }).map((_, index) => (
          <circle key={index} cx={111 + index * 4} cy={150 + (index % 2) * 5} r="1.1" />
        ))}
      </g>
    </svg>
  );
}

/** Small radial cracker burst for quiet, animated festive highlights. */
export function CrackerBurst({ className = "" }: DecorProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`${className} motion-safe:animate-[pulse_3s_ease-in-out_infinite]`}
    >
      <g stroke="currentColor" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, index) => {
          const angle = (index * 22.5 * Math.PI) / 180;
          const inner = index % 2 === 0 ? 21 : 27;
          const outer = index % 2 === 0 ? 43 : 36;
          return (
            <line
              key={index}
              x1={60 + Math.cos(angle) * inner}
              y1={60 + Math.sin(angle) * inner}
              x2={60 + Math.cos(angle) * outer}
              y2={60 + Math.sin(angle) * outer}
              strokeWidth={index % 2 === 0 ? 1.7 : 1.1}
            />
          );
        })}
      </g>
      <g fill="currentColor">
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <path
              key={index}
              d="M60 12 63 23 60 20 57 23Z"
              transform={`rotate(${index * 45} 60 60)`}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 45 * Math.PI) / 180;
          return (
            <circle
              key={`spark-${index}`}
              cx={60 + Math.cos(angle) * 49}
              cy={60 + Math.sin(angle) * 49}
              r="1.8"
            />
          );
        })}
      </g>
      <circle cx="60" cy="60" r="3" fill="currentColor" />
    </svg>
  );
}

export function Diya({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* flame */}
      <path
        d="M32 10c3.6 4.2 5.6 7.6 5.6 10.9 0 3.4-2.5 5.9-5.6 5.9s-5.6-2.5-5.6-5.9C26.4 17.6 28.4 14.2 32 10Z"
        fill="url(#diyaFlame)"
      />
      {/* lamp bowl */}
      <path
        d="M12 36h40c0 8.3-9 13.4-20 13.4S12 44.3 12 36Z"
        fill="url(#diyaBowl)"
      />
      <path d="M10 35.2h44c0 1.6-1 2.6-2.4 2.6H12.4C11 37.8 10 36.8 10 35.2Z" fill="#B07D1E" />
      {/* glow pooling under the lamp */}
      <ellipse cx="32" cy="51" rx="19" ry="3.2" fill="#F0B429" opacity="0.25" />
      <defs>
        <linearGradient id="diyaFlame" x1="32" y1="10" x2="32" y2="26.8">
          <stop stopColor="#FDE68A" />
          <stop offset="0.55" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="diyaBowl" x1="12" y1="36" x2="52" y2="49.4">
          <stop stopColor="#E0A52E" />
          <stop offset="1" stopColor="#A9741B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Delicate floral spray for section edges. */
export function FloralSpray({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 160 200" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.75">
        <path d="M80 200C80 150 70 120 40 92" />
        <path d="M80 160c-14-4-24-14-28-28" />
        <path d="M80 128c-12-6-18-16-19-30" />
        <path d="M80 182c12-8 18-20 18-36" />
      </g>
      <g fill="currentColor" opacity="0.55">
        {[
          [40, 92, 7],
          [52, 132, 5],
          [61, 98, 4.5],
          [98, 146, 5.5],
          [86, 118, 4],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            {Array.from({ length: 6 }).map((_, p) => {
              const angle = (p * 60 * Math.PI) / 180;
              return (
                <ellipse
                  key={p}
                  cx={cx + Math.cos(angle) * r}
                  cy={cy + Math.sin(angle) * r}
                  rx={r * 0.62}
                  ry={r * 0.42}
                  transform={`rotate(${p * 60} ${cx + Math.cos(angle) * r} ${cy + Math.sin(angle) * r})`}
                />
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Thin gold rule with a centred diamond — separates stacked content. */
export function GoldDivider({ className = "" }: DecorProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9972B]/50" />
      <span className="size-1.5 rotate-45 bg-[#C9972B]/70" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9972B]/50" />
    </div>
  );
}

/** Small uppercase eyebrow pill used above section headings. */
export function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-flex items-center rounded-full border border-[#C9972B]/40 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F0B429]"
          : "inline-flex items-center rounded-full border border-[#C9972B]/30 bg-[#FDF6E7] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A9741B]"
      }
    >
      {children}
    </span>
  );
}
