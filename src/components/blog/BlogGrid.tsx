import type { BlogListItem } from "@/lib/schema";
import BlogCard from "@/components/blog/BlogCard";

type BlogGridProps = {
  blogs: BlogListItem[];
};

export default function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-[32px] border border-border bg-card px-8 py-14 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-heading">No blogs found</h2>
        <p className="mt-3 text-body">Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
