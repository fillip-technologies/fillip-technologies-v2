import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getAdminById } from "./queries";
import { getRedisClient } from "@/lib/redis";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
const BLOCKLIST_PREFIX = "fillip:logout:";

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

export async function decrypt(token?: string): Promise<(SessionPayload & { iat?: number }) | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      sessionVersion: (payload.sessionVersion as number) ?? 0,
      iat: payload.iat,
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

/**
 * Clear the session cookie and record a kill-timestamp in Redis so the JWT is
 * rejected immediately even if presented again (e.g. a copied cookie) before
 * its 7-day expiry. Best-effort — a Redis outage just means the cookie stays
 * valid until the session_version DB check in getSession().
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    const payload = await decrypt(token);
    if (payload) {
      try {
        const client = getRedisClient();
        if (client) {
          const key = `${BLOCKLIST_PREFIX}${payload.userId}:${payload.sessionVersion}`;
          await client.set(key, String(Date.now()), "EX", MAX_AGE_SECONDS);
        }
      } catch {
        // Redis error — cookie is deleted below, logout still proceeds.
      }
    }
  }

  cookieStore.delete(COOKIE_NAME);
}

/** Read + verify the current session. Safe to call from Server Components. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(COOKIE_NAME)?.value);
  if (!session) return null;

  // Fast path: check the Redis logout blocklist before hitting the DB.
  // The kill record stores the logout timestamp; the token's `iat` is when it
  // was issued. If killedAt > issuedAt the user logged out after this token was
  // minted, so reject it. A fresh login after logout gets a new token with a
  // later iat and is never blocked by the old kill record.
  try {
    const client = getRedisClient();
    if (client) {
      const key = `${BLOCKLIST_PREFIX}${session.userId}:${session.sessionVersion}`;
      const killedAtStr = await client.get(key);
      if (killedAtStr !== null) {
        const killedAt = Number(killedAtStr);
        const issuedAt = (session.iat ?? 0) * 1000;
        if (killedAt > issuedAt) return null;
      }
    }
  } catch {
    // Redis error — fall through to the DB check below.
  }

  // DB check: session_version still matches (handles password changes).
  const admin = await getAdminById(session.userId);
  if (!admin || admin.session_version !== session.sessionVersion) return null;

  return session;
}
