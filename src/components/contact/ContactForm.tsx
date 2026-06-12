"use client";

import { useActionState } from "react";
import { submitContact } from "@/server/contact/actions";
import { initialContactState } from "@/server/contact/types";

/**
 * Example contact form wired to the `submitContact` Server Action.
 * Drop it into any page, e.g. `app/contact/page.tsx`.
 */
export default function ContactForm({ source }: { source?: string }) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState
  );

  if (state.ok) {
    return (
      <p className="rounded-md border border-card/55 bg-card/40 p-4 text-heading">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {source ? <input type="hidden" name="source" value={source} /> : null}

      <Field label="Name" name="name" errors={state.errors?.name} required />
      <Field label="Email" name="email" type="email" errors={state.errors?.email} required />
      <Field label="Phone" name="phone" errors={state.errors?.phone} />
      <Field label="Company" name="company" errors={state.errors?.company} />

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-body">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-card/55 bg-transparent px-3 py-2 text-heading outline-none focus:border-primary"
        />
        <FieldError errors={state.errors?.message} />
      </div>

      {state.message && !state.ok ? (
        <p className="text-sm text-red-500">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-5 py-2.5 font-medium text-white transition-opacity disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-body">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-card/55 bg-transparent px-3 py-2 text-heading outline-none focus:border-primary"
      />
      <FieldError errors={errors} />
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-500">{errors[0]}</p>;
}
