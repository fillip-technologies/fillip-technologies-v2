// Plain module (NOT "use server"): form-state type + initial value for the
// CMS save action's useActionState.

export type SaveState = { ok: boolean; message: string };

export const initialSaveState: SaveState = { ok: false, message: "" };
