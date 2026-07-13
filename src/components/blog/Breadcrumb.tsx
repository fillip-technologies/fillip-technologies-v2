import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  current: string;
};

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-body">
      <Link href="/" className="hover:text-primary">Home</Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/blog" className="hover:text-primary">Blog</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-heading">{current}</span>
    </nav>
  );
}
