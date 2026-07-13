import type { BlogTocItem } from "@/lib/schema";

type BlogContentProps = {
  content: string;
};

export function getTableOfContents(content: string): BlogTocItem[] {
  const headings: BlogTocItem[] = [];
  const headingRegex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content))) {
    headings.push({
      level: Number(match[1]) as 2 | 3,
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, "").trim(),
    });
  }

  return headings;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div
      className="blog-content max-w-none text-body [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:text-heading [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-heading [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-heading [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[24px] [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_p]:leading-8 [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:bg-slate-50 [&_th]:p-3 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
