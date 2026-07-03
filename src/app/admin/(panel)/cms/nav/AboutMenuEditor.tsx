"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { saveNavMenu } from "@/server/nav/actions";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";
import type { NavMenuId } from "@/server/nav/menus";
import type { SaveState } from "@/server/content/types";

export default function NavMenuEditor({ menuId, initial }: { menuId: NavMenuId; initial: AboutMenuItem[] }) {
  const [items, setItems] = useState<AboutMenuItem[]>(() => initial.map((i) => ({ ...i })));
  const [state, setState] = useState<SaveState | null>(null);
  const [pending, startTransition] = useTransition();

  const setField = (idx: number, key: keyof AboutMenuItem, v: string) =>
    setItems((p) => p.map((it, i) => (i === idx ? { ...it, [key]: v } : it)));
  const addItem = () => setItems((p) => [...p, { label: "", href: "" }]);
  const removeItem = (idx: number) => setItems((p) => p.filter((_, i) => i !== idx));
  const moveItem = (idx: number, dir: -1 | 1) =>
    setItems((p) => {
      const next = [...p];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return p;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });

  const save = () => {
    startTransition(async () => setState(await saveNavMenu(menuId, items)));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Page {idx + 1}</span>
              <div className="flex items-center gap-1">
                <IconBtn title="Move up" onClick={() => moveItem(idx, -1)} disabled={idx === 0}>
                  <ChevronUp size={15} />
                </IconBtn>
                <IconBtn title="Move down" onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1}>
                  <ChevronDown size={15} />
                </IconBtn>
                <IconBtn title="Remove" onClick={() => removeItem(idx)} danger>
                  <Trash2 size={15} />
                </IconBtn>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-body">Label</label>
                <input
                  value={item.label}
                  onChange={(e) => setField(idx, "label", e.target.value)}
                  placeholder="Our Story"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-body">URL</label>
                <input
                  value={item.href}
                  onChange={(e) => setField(idx, "href", e.target.value)}
                  placeholder="/our-story"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary"
        >
          <Plus size={16} /> Add page
        </button>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state?.message ? (
          <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-500"}`}>{state.message}</p>
        ) : null}
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded p-1.5 transition-colors disabled:opacity-30 ${
        danger ? "text-red-500 hover:bg-red-500/10" : "text-muted-foreground hover:bg-card"
      }`}
    >
      {children}
    </button>
  );
}
