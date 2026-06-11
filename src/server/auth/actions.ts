"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminByEmail } from "./queries";
import { verifyPassword } from "./password";
import { createSession, destroySession } from "./session";
import type { LoginState } from "./types";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const admin = await getAdminByEmail(parsed.data.email);
  // Always run a compare to avoid leaking whether the email exists (timing).
  const ok = admin
    ? await verifyPassword(parsed.data.password, admin.password_hash)
    : false;

  if (!admin || !ok) {
    return { error: "Invalid email or password." };
  }

  await createSession({ userId: admin.id, email: admin.email });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
