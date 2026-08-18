import Link from "next/link";
import { FileText } from "lucide-react";

type GetQuoteButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function GetQuoteButton({
  href = "/contact",
  label = "Get a Quote",
  className = "",
}: GetQuoteButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors duration-300 hover:text-blue-600 ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-blue-200 group-hover:bg-blue-50/50">
        <FileText className="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-blue-600" />
      </span>
      <span>{label}</span>
    </Link>
  );
}
