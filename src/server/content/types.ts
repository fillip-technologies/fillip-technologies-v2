// Plain module (NOT "use server"): form-state type + initial value for the
// CMS save action's useActionState.

export type SaveState = { ok: boolean; message: string };

export const initialSaveState: SaveState = { ok: false, message: "" };

// Returned by every auth-guarded server action when the session is missing.
// Typed `as const` so TypeScript can verify it against both SaveState and any
// extension like SeoSaveState (where issues?: ... is optional).
export const UNAUTHORIZED = { ok: false, message: "Not authorized." } as const;
