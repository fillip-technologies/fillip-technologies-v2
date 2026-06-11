"use client";

import { useActionState } from "react";
import { login } from "@/server/auth/actions";
import { initialLoginState } from "@/server/auth/types";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialLoginState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-body">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-body">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-red-500" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
