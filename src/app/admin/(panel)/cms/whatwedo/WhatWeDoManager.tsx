"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink, Eye } from "lucide-react";
import { setCategoryPublished } from "@/server/content/whatwedo-actions";

type Category = { slug: string; label: string; published: boolean; sortOrder: number };

export default function WhatWeDoManager({ initial }: { initial: Category[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const togglePublish = (s: string, next: boolean) => {
    setMsg(null);
    startTransition(async () => {
      const res = await setCategoryPublished(s, next);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {msg ? (
        <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>
      ) : null}

      {/* List */}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {initial.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">No categories yet.</li>
        ) : null}
        {initial.map((cat) => (
          <li key={cat.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <Link href={`/admin/cms/whatwedo/${cat.slug}`} className="min-w-0 flex-1 group">
              <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                {cat.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    cat.published
                      ? "bg-green-500/15 text-green-600"
                      : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {cat.published ? "Published" : "Draft"}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">/what-we-do/{cat.slug}</p>
            </Link>

            <div className="flex items-center gap-1">
              <IconLink href={`/what-we-do/${cat.slug}/preview`} title="Preview draft">
                <Eye size={16} />
              </IconLink>
              {cat.published ? (
                <IconLink href={`/what-we-do/${cat.slug}`} title="View live page">
                  <ExternalLink size={16} />
                </IconLink>
              ) : null}
              <button
                type="button"
                onClick={() => togglePublish(cat.slug, !cat.published)}
                disabled={pending}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  cat.published
                    ? "border-border text-body hover:bg-card"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {cat.published ? "Unpublish" : "Publish"}
              </button>
              <Link
                href={`/admin/cms/whatwedo/${cat.slug}`}
                className="rounded-md p-2 text-muted-foreground hover:bg-card"
                title="Edit sections"
              >
                <ChevronRight size={18} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-heading"
    >
      {children}
    </a>
  );
}
