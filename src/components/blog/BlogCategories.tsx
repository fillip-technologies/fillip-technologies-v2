import Link from "next/link";

type BlogCategoriesProps = {
  categories: string[];
  activeCategory?: string;
  query?: string;
};

export default function BlogCategories({ categories, activeCategory = "all", query = "" }: BlogCategoriesProps) {
  const items = ["all", ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((category) => {
        const isActive = category.toLowerCase() === activeCategory.toLowerCase();
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (category !== "all") params.set("category", category);
        const href = params.toString() ? `/blog?${params.toString()}` : "/blog";

        return (
          <Link
            key={category}
            href={href}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "bg-primary text-white shadow-[0_8px_20px_rgba(2,66,162,0.18)]"
                : "border border-border bg-card text-body hover:border-primary/30 hover:text-primary"
            }`}
          >
            {category === "all" ? "All" : category}
          </Link>
        );
      })}
    </div>
  );
}
