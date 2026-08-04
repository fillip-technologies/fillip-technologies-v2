import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogCmsPost } from "@/server/content/blog-registry";
import BlogPostEditor from "./BlogPostEditor";

export const metadata = { title: "Edit Blog - CMS" };
export const dynamic = "force-dynamic";

export default async function BlogPostEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogCmsPost(slug);
  if (!post) notFound();

  return (
    <section className="max-w-5xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/blogs" className="hover:text-heading">
          Blogs
        </Link>{" "}
        / {post.title}
      </nav>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-lg font-semibold text-heading">Edit: {post.title}</h1>
          <p className="text-sm text-muted-foreground">
            <code>/blog/{post.slug}</code> - {post.published ? "Published" : "Draft"}
          </p>
        </div>
        {post.published ? (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-2 text-sm font-medium text-body hover:border-primary hover:text-primary"
          >
            View live
          </a>
        ) : null}
      </div>

      <BlogPostEditor post={post} />
    </section>
  );
}
