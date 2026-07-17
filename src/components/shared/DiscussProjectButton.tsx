import Link from "next/link";
import { ArrowRight } from "lucide-react";

type DiscussProjectButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function DiscussProjectButton({
  href = "/contact",
  label = "Discuss Your Project",
  className = "",
}: DiscussProjectButtonProps) {
  return (
    <Link
      href={href}
      className={`group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[var(--primary)] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] active:scale-[0.98] ${className}`}
    >
      <span className="absolute inset-0 h-full w-[40px] translate-x-[-100px] skew-x-[-20deg] bg-white/20 transition-transform duration-[1200ms] ease-out group-hover/btn:translate-x-[350px] pointer-events-none" />
      <span>{label}</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
        <ArrowRight className="h-3 w-3 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      </span>
    </Link>
  );
}
