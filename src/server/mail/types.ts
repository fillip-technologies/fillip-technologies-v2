// Plain module (NOT "use server"): a "use server" file may only export async
// functions, so the form-state type and initial value live here instead.

export type DirectMailState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const initialDirectMailState: DirectMailState = { ok: false, message: "" };
