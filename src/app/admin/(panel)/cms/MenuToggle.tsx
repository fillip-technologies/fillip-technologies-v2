"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setCategoryLinkInMenu } from "@/server/content/whatwedo-actions";

/**
 * Shared "show in hover menu" controls for the CMS page lists. Whether a page is
 * in a menu is independent of whether it's published: a published page can stay
 * out of the menu, and a draft that's in the menu shows there once published.
 */

/** "In menu" / "Not in menu" pill, shown next to a row's publish badge. */
export function MenuBadge({ inMenu }: { inMenu: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
        inMenu ? "bg-sky-500/15 text-sky-600" : "bg-card text-muted-foreground"
      }`}
    >
      {inMenu ? "In menu" : "Not in menu"}
    </span>
  );
}

/** Adds a row's page to, or removes it from, its column's hover menu. */
export function MenuToggleButton({
  inMenu,
  disabled,
  onClick,
}: {
  inMenu: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={inMenu ? "Remove from the hover menu" : "Add to the hover menu"}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
        inMenu
          ? "border-border text-body hover:bg-card"
          : "border-sky-500/40 text-sky-600 hover:bg-sky-500/10"
      }`}
    >
      {inMenu ? "Hide from menu" : "Show in menu"}
    </button>
  );
}

/** One-line note under a row about its menu state, or nothing. */
export function MenuHint({
  inMenu,
  published,
  note,
}: {
  inMenu: boolean;
  published: boolean;
  note?: string | null;
}) {
  if (inMenu && !published) {
    return <p className="text-xs text-amber-600">Shows in the menu once published.</p>;
  }
  if (!inMenu && note) {
    return <p className="text-xs text-muted-foreground">{note}</p>;
  }
  return null;
}

/**
 * Menu toggle for a link that isn't a CMS page row (e.g. a custom-layout page),
 * matched by href within one What We Do column.
 */
export function CategoryLinkMenuToggle({
  categorySlug,
  label,
  href,
  inMenu,
}: {
  categorySlug: string;
  label: string;
  href: string;
  inMenu: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    setError(null);
    startTransition(async () => {
      const res = await setCategoryLinkInMenu(categorySlug, label, href, !inMenu);
      if (!res.ok) setError(res.message);
      router.refresh();
    });
  };

  return (
    <>
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
      <MenuToggleButton inMenu={inMenu} disabled={pending} onClick={toggle} />
    </>
  );
}
