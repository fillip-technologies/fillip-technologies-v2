import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryPageView from "@/components/whatwedo/CategoryPageView";
import { getCategory } from "@/server/content/whatwedo-registry";
import { getSession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

/**
 * Draft preview of a What-We-Do category page — renders inside the public site
 * chrome so it looks exactly like the live page, but is gated to logged-in
 * admins and works even while the category is unpublished.
 */
export default async function CategoryPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await getSession())) notFound();
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
        <span>
          Draft preview — “{category.label}” is {category.published ? "published" : "not published yet"}.
        </span>
        <Link href={`/admin/cms/whatwedo/${slug}`} className="underline underline-offset-2">
          Back to editor
        </Link>
      </div>
      <CategoryPageView slug={slug} />
    </>
  );
}
