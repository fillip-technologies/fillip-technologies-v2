"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { saveHomeSection } from "@/server/content/actions";
import type { Field, ListDef } from "@/server/content/home-sections";
import type { SaveState } from "@/server/content/types";

type Item = Record<string, string>;

export default function SectionEditor({
  sectionId,
  fields,
  list,
  initial,
}: {
  sectionId: string;
  fields: Field[];
  list: ListDef | null;
  initial: Record<string, unknown>;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, String(initial[f.name] ?? "")]))
  );
  const [items, setItems] = useState<Item[]>(() =>
    list ? ((initial[list.name] as Item[] | undefined) ?? []).map((i) => ({ ...i })) : []
  );
  const [state, setState] = useState<SaveState | null>(null);
  const [pending, startTransition] = useTransition();

  const setField = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));
  const setItemField = (idx: number, name: string, v: string) =>
    setItems((p) => p.map((it, i) => (i === idx ? { ...it, [name]: v } : it)));
  const addItem = () =>
    setItems((p) => [...p, Object.fromEntries(list!.itemFields.map((f) => [f.name, ""]))]);
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
    startTransition(async () => {
      const payload = { ...values, ...(list ? { [list.name]: items } : {}) };
      setState(await saveHomeSection(sectionId, payload));
    });
  };

  return (
    <div className="space-y-6">
      {/* Scalar fields */}
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-body">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
              />
            ) : (
              <input
                id={field.name}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
              />
            )}
            {field.help ? <p className="mt-1 text-xs text-muted-foreground">{field.help}</p> : null}
          </div>
        ))}
      </div>

      {/* List repeater */}
      {list ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-heading">{list.label}</h2>
            <span className="text-xs text-muted-foreground">{items.length} {list.itemNoun}(s)</span>
          </div>

          {items.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-border bg-card/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {list.itemNoun} {idx + 1}
                </span>
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
                {list.itemFields.map((f) => (
                  <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="mb-1 block text-xs text-body">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        value={item[f.name] ?? ""}
                        onChange={(e) => setItemField(idx, f.name, e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary"
                      />
                    ) : (
                      <input
                        value={item[f.name] ?? ""}
                        onChange={(e) => setItemField(idx, f.name, e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary"
          >
            <Plus size={16} /> Add {list.itemNoun}
          </button>
        </div>
      ) : null}

      {/* Save */}
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
