import { Search } from "lucide-react";

type BlogSearchProps = {
  value?: string;
};

export default function BlogSearch({ value = "" }: BlogSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
      <input
        type="search"
        name="q"
        defaultValue={value}
        placeholder="Search blogs"
        className="h-14 w-full rounded-full border border-border bg-card pl-13 pr-5 text-sm font-medium text-heading shadow-sm outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}
