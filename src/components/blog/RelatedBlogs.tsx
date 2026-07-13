import type { BlogListItem } from "@/lib/schema";
import BlogGrid from "@/components/blog/BlogGrid";

type RelatedBlogsProps = {
  blogs: BlogListItem[];
};

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Related Blogs</p>
        <h2 className="text-3xl font-bold text-heading">Keep Reading</h2>
      </div>
      <BlogGrid blogs={blogs} />
    </section>
  );
}
