// Plain module (NOT "use server"): a "use server" file may only export async
// functions, so the form-state type and initial value live here instead.

export type LoginState = { error: string };

export const initialLoginState: LoginState = { error: "" };
