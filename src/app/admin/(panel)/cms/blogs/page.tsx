import Link from "next/link";
import { listBlogPosts } from "@/server/content/blog-registry";
import BlogPostsManager from "./BlogPostsManager";

export const metadata = { title: "Blogs - CMS" };
export const dynamic = "force-dynamic";

export default async function BlogPostsCmsPage() {
  const posts = await listBlogPosts();

  return (
    <section className="max-w-5xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Blogs
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Blog posts</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Create, edit and publish posts for <code>/blog</code>, individual blog pages, and the
        latest-blog cards on the home page.
      </p>

      <BlogPostsManager initial={posts} />
    </section>
  );
}
