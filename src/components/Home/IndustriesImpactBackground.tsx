export const INDUSTRIES_IMPACT_IMAGE = "/images/impact.jpg";

export default function IndustriesImpactBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
        linear-gradient(to right, #0f172a 1px, transparent 1px),
        linear-gradient(to bottom, #0f172a 1px, transparent 1px)
      `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Glow */}

      <div
        className="
      absolute
      left-1/2
      top-[10%]
      h-[700px]
      w-[700px]
      -translate-x-1/2
      rounded-full
      bg-gradient-to-r
      from-indigo-200/30
      to-cyan-200/30
      blur-[120px]
    "
      />

      {/* Left Glow */}

      <div
        className="
      absolute
      left-[-100px]
      top-1/3
      h-[400px]
      w-[400px]
      rounded-full
      bg-indigo-100/30
      blur-[100px]
    "
      />

      {/* Right Glow */}

      <div
        className="
      absolute
      right-[-100px]
      bottom-0
      h-[400px]
      w-[400px]
      rounded-full
      bg-cyan-100/30
      blur-[100px]
    "
      />
    </div>
  );
}
