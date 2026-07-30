import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getAdminById } from "./queries";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export type SessionPayload = {
  userId: string;
  email: string;
  // Version the admin's password was at when this session was issued. Compared
  // against the DB on every getSession() so a password change logs everyone out.
  sessionVersion: number;
};

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to .env.local (see .env.example).");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getKey());
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      sessionVersion: (payload.sessionVersion as number) ?? 0,
    };
  } catch {
    return null;
  }
}

/** Create the session cookie. Call only from a Server Action / Route Handler. */
export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Clear the session cookie. Call only from a Server Action / Route Handler. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Read + verify the current session. Safe to call from Server Components. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(COOKIE_NAME)?.value);
  if (!session) return null;

  // Re-check the token's version against the admin's current one. If the
  // password has changed since this token was issued (or the admin no longer
  // exists), the versions won't match and the session is rejected.
  const admin = await getAdminById(session.userId);
  if (!admin || admin.session_version !== session.sessionVersion) return null;

  return session;
}
