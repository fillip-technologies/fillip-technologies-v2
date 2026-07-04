"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Eye } from "lucide-react";
import { setCategoryPublished } from "@/server/content/whatwedo-actions";

export default function StatusBar({ slug, published }: { slug: string; published: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const toggle = () => {
    setMsg(null);
    startTransition(async () => {
      const res = await setCategoryPublished(slug, !published);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/40 px-4 py-3">
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
          published ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"
        }`}
      >
        {published ? "Published" : "Draft"}
      </span>

      <a
        href={`/what-we-do/${slug}/preview`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-body hover:text-heading"
      >
        <Eye size={15} /> Preview
      </a>

      {published ? (
        <a
          href={`/what-we-do/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-body hover:text-heading"
        >
          <ExternalLink size={15} /> View live
        </a>
      ) : null}

      <div className="ml-auto flex items-center gap-3">
        {msg ? (
          <span className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</span>
        ) : null}
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
            published
              ? "border-border text-body hover:bg-card"
              : "border-primary/40 text-primary hover:bg-primary/10"
          }`}
        >
          {pending ? "…" : published ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
}
