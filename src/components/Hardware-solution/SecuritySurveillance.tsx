"use client";

import SecurityHero from "./SecurityHero";
import SecurityPriority from "./SecurityPriority";
import SecurityServices from "./SecurityServices";
import SecuritySupport from "./SecuritySupport";

export default function SecuritySurveillance() {
  return (
    <div className="relative w-full bg-slate-50/50">
      {/* 1. Hero Section (Light Background) */}
      <SecurityHero />

      {/* 2. Priority & Dome camera details */}
      <SecurityPriority />

      {/* 3. High-Quality Services Grid */}
      <SecurityServices />

      {/* 4. Support and Technician details */}
      <SecuritySupport />
    </div>
  );
}
