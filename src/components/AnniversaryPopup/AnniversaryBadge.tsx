export default function AnniversaryBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-amber-200/60 bg-white/70 px-4 py-2 shadow-[0_10px_30px_rgba(217,154,36,0.12)] backdrop-blur-md"
      aria-label="13 years anniversary"
    >
      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(245,190,80,0.85)]" />
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-700">
        13 Years
      </span>
    </div>
  );
}
