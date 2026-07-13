import Link from "next/link";
import type { BlogListItem, BlogTocItem } from "@/lib/schema";

type BlogSidebarProps = {
  toc: BlogTocItem[];
  latestBlogs: BlogListItem[];
};

export default function BlogSidebar({ toc, latestBlogs }: BlogSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28">
      {toc.length > 0 ? (
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-heading">Table of Contents</h2>
          <nav className="mt-4 space-y-3">
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`block text-sm font-medium text-body hover:text-primary ${item.level === 3 ? "pl-4" : ""}`}>
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-bold text-heading">Latest Blogs</h2>
        <div className="mt-4 space-y-4">
          {latestBlogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block border-b border-border pb-4 last:border-0 last:pb-0">
              <span className="text-sm font-bold leading-6 text-heading hover:text-primary">{blog.title}</span>
              <span className="mt-1 block text-xs font-medium text-body">{blog.readingTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
