import { dbConnect } from "@/lib/db";
import { AdminUserModel } from "@/server/db/models";

export type AdminUser = {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  // Incremented on every password change; sessions carry the version they were
  // issued at, so old sessions stop matching once it moves.
  session_version: number;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toAdmin(doc: any): AdminUser {
  return {
    id: String(doc._id),
    email: doc.email,
    password_hash: doc.password_hash,
    name: doc.name ?? null,
    session_version: doc.session_version ?? 0,
    created_at: new Date(doc.created_at).toISOString(),
  };
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  await dbConnect();
  const doc = await AdminUserModel.findOne({ email: email.toLowerCase() }).lean();
  return doc ? toAdmin(doc) : null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  await dbConnect();
  // Guard against malformed ids so a bad cookie can't throw a cast error.
  if (!/^[a-f\d]{24}$/i.test(id)) return null;
  const doc = await AdminUserModel.findById(id).lean();
  return doc ? toAdmin(doc) : null;
}

export async function createAdmin(
  email: string,
  passwordHash: string,
  name?: string
): Promise<AdminUser> {
  await dbConnect();
  // Bump session_version so setting/changing the password invalidates any
  // sessions that were issued against the previous credentials.
  const doc = await AdminUserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { password_hash: passwordHash }, $inc: { session_version: 1 }, $setOnInsert: { name: name ?? null } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  return toAdmin(doc);
}
