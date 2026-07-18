import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function TalkButton() {
  return (
    <div className="relative inline-flex">
      {/* AI Stars */}
      <div className="absolute -top-3 right-0 text-[12px] text-primary ai-star pointer-events-none">
        ✦
      </div>

      <div className="absolute -top-1 right-5 text-[8px] text-accent ai-star-delayed pointer-events-none">
        ✧
      </div>

      <div className="animated-border inline-flex rounded-full p-[1px]">
        <Link
          href="/contact"
          className="group inline-flex h-11 min-w-[154px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-card px-5 text-sm font-semibold text-heading transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <span>Get Proposal</span>
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default TalkButton;
