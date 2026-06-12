import { query } from "@/lib/db";

export type AdminUser = {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: string;
};

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const rows = await query<AdminUser>(
    `SELECT * FROM admin_users WHERE email = $1`,
    [email.toLowerCase()]
  );
  return rows[0] ?? null;
}

export async function createAdmin(
  email: string,
  passwordHash: string,
  name?: string
): Promise<AdminUser> {
  const rows = await query<AdminUser>(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
     RETURNING *`,
    [email.toLowerCase(), passwordHash, name ?? null]
  );
  return rows[0];
}
