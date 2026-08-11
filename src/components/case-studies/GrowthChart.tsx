"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Lightweight, dependency-free growth chart for the case-study "journey" section.
 * Plots monthly values as a smooth area+line that draws itself when scrolled into
 * view. Dips in the data (e.g. the described SEO re-indexing months) show up
 * naturally as the line falls and recovers.
 */
export default function GrowthChart({
  values,
  label,
  months,
}: {
  values: number[];
  label?: string;
  months?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!values.length) return null;

  // Geometry in a fixed viewBox; the SVG scales responsively to its container.
  const W = 820;
  const H = 320;
  const padX = 44;
  const padTop = 32;
  const padBottom = 48;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;

  const points = values.map((v, i) => {
    const x = padX + (values.length === 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
    const y = padTop + innerH - ((v - min) / span) * innerH;
    return { x, y };
  });

  // Smooth path (Catmull-Rom -> cubic bezier) so the trend reads as a curve.
  const line = smoothPath(points);
  const area = `${line} L ${points[points.length - 1].x},${padTop + innerH} L ${points[0].x},${padTop + innerH} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => padTop + innerH - t * innerH);
  const labelFor = (i: number) => months?.[i] ?? `M${i + 1}`;

  return (
    <div ref={ref} className="w-full">
      {label ? (
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
          {label}
        </div>
      ) : null}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${label ?? "Growth"} over ${values.length} months`}
      >
        <defs>
          <linearGradient id="csGrowthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines */}
        {gridLines.map((y, i) => (
          <line
            key={i}
            x1={padX}
            x2={W - padX}
            y1={y}
            y2={y}
            stroke="currentColor"
            className="text-slate-200"
            strokeWidth="1"
          />
        ))}

        {/* area fill */}
        <motion.path
          d={area}
          fill="url(#csGrowthArea)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* the line, drawn on scroll-in */}
        <motion.path
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* data points + month labels */}
        {points.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="white"
              stroke="var(--primary)"
              strokeWidth="2.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.09 }}
            />
            <text
              x={p.x}
              y={H - 18}
              textAnchor="middle"
              className="fill-slate-400 text-[13px] font-medium"
            >
              {labelFor(i)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Catmull-Rom spline through the points, emitted as an SVG cubic-bezier path. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return pts.length ? `M ${pts[0].x},${pts[0].y}` : "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}
