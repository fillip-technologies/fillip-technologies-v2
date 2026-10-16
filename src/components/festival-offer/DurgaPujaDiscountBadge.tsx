type DurgaPujaDiscountBadgeProps = {
  size?: "hero" | "banner" | "closing";
};

const SIZE_CLASSES = {
  hero: "size-[88px]",
  banner: "size-[76px]",
  closing: "size-[84px]",
} as const;

/** Vermilion and gold offer seal with a small lotus motif for Durga Puja. */
export default function DurgaPujaDiscountBadge({
  size = "hero",
}: DurgaPujaDiscountBadgeProps) {
  return (
    <span
      role="img"
      aria-label="Durga Puja special, 60 percent off"
      className={`relative inline-flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border-[3px] border-[#FDE68A] bg-gradient-to-br from-[#9F1239] via-[#C2410C] to-[#F59E0B] text-center text-white shadow-[0_10px_28px_rgba(153,27,27,0.3)] ring-1 ring-inset ring-[#7F1D1D]/30 ${SIZE_CLASSES[size]}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4px] rounded-full border border-[#FDE68A]/70 motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="relative mb-0.5 size-[17px] text-[#FDE68A]"
      >
        <path
          d="M12 3.2c2.4 2.6 2.5 4.7 0 6.5-2.5-1.8-2.4-3.9 0-6.5Zm-6.6 4c3.6.2 5.2 1.7 5 5-3.4.2-4.9-1.4-5-5Zm13.2 0c-3.6.2-5.2 1.7-5 5 3.4.2 4.9-1.4 5-5ZM4.2 12c2.1 2.8 4.4 3.6 7 2.3-1.1-3.1-3.3-4-7-2.3Zm15.6 0c-2.1 2.8-4.4 3.6-7 2.3 1.1-3.1 3.3-4 7-2.3ZM7 16.2c1.1 2.5 2.8 3.7 5 3.7s3.9-1.2 5-3.7H7Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
      </svg>
      <span className="relative text-[8px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#FFF3C4]">
        Durga Puja
      </span>
      <span className="relative mt-0.5 text-[22px] font-black leading-[0.95] tracking-tight sm:text-2xl">
        60%
      </span>
      <span className="relative mt-0.5 text-[10px] font-extrabold uppercase leading-none tracking-[0.2em] text-[#FFF3C4]">
        OFF
      </span>
    </span>
  );
}
