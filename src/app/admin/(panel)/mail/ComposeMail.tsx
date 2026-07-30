"use client";

import { useActionState, useState } from "react";
import { Send, Plus } from "lucide-react";
import { sendDirectMailAction } from "@/server/mail/actions";
import { initialDirectMailState } from "@/server/mail/types";

export default function ComposeMail({
  defaultTo,
  defaultSubject = "",
  defaultMessage = "",
}: {
  defaultTo: string;
  defaultSubject?: string;
  defaultMessage?: string;
}) {
  const [state, formAction, pending] = useActionState(
    sendDirectMailAction,
    initialDirectMailState
  );

  const fieldError = (name: string) => state.errors?.[name]?.[0];

  // Reveal Cc/Bcc if they already hold a value or came back with an error.
  const [showCcBcc, setShowCcBcc] = useState(
    Boolean(fieldError("cc") || fieldError("bcc"))
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="to" className="block text-sm text-body">
            To
          </label>
          {!showCcBcc ? (
            <button
              type="button"
              onClick={() => setShowCcBcc(true)}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Plus size={13} aria-hidden="true" />
              Add Cc / Bcc
            </button>
          ) : null}
        </div>
        <input
          id="to"
          name="to"
          type="text"
          required
          defaultValue={defaultTo}
          placeholder="client@example.com, another@example.com"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Separate multiple recipients with commas.
        </p>
        {fieldError("to") ? (
          <p className="mt-1 text-sm text-red-500">{fieldError("to")}</p>
        ) : null}
      </div>

      {showCcBcc ? (
        <>
          <div>
            <label htmlFor="cc" className="mb-1 block text-sm text-body">
              Cc
            </label>
            <input
              id="cc"
              name="cc"
              type="text"
              placeholder="cc@example.com, another@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
            {fieldError("cc") ? (
              <p className="mt-1 text-sm text-red-500">{fieldError("cc")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="bcc" className="mb-1 block text-sm text-body">
              Bcc
            </label>
            <input
              id="bcc"
              name="bcc"
              type="text"
              placeholder="bcc@example.com, another@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
            {fieldError("bcc") ? (
              <p className="mt-1 text-sm text-red-500">{fieldError("bcc")}</p>
            ) : null}
          </div>
        </>
      ) : null}

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm text-body">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          defaultValue={defaultSubject}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
        />
        {fieldError("subject") ? (
          <p className="mt-1 text-sm text-red-500">{fieldError("subject")}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-body">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={10}
          required
          defaultValue={defaultMessage}
          placeholder="Write your message…"
          className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
        />
        {fieldError("message") ? (
          <p className="mt-1 text-sm text-red-500">{fieldError("message")}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="attachments" className="mb-1 block text-sm text-body">
          Attachments <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          className="block w-full cursor-pointer rounded-md border border-border bg-background text-sm text-body outline-none file:mr-3 file:cursor-pointer file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:text-heading hover:file:bg-card focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">Up to 10 files, 15 MB total.</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-body">
        <input
          type="checkbox"
          name="bccCompany"
          defaultChecked
          className="h-4 w-4 rounded border-border accent-primary"
        />
        Send a copy to the company inbox
      </label>

      {state.message ? (
        <p
          role="status"
          className={`text-sm ${state.ok ? "text-green-600" : "text-red-500"}`}
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
      >
        <Send size={16} aria-hidden="true" />
        {pending ? "Sending…" : "Send email"}
      </button>
    </form>
  );
}
