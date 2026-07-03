import { dbConnect } from "@/lib/db";
import { AdminUserModel } from "@/server/db/models";

export type AdminUser = {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toAdmin(doc: any): AdminUser {
  return {
    id: String(doc._id),
    email: doc.email,
    password_hash: doc.password_hash,
    name: doc.name ?? null,
    created_at: new Date(doc.created_at).toISOString(),
  };
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  await dbConnect();
  const doc = await AdminUserModel.findOne({ email: email.toLowerCase() }).lean();
  return doc ? toAdmin(doc) : null;
}

export async function createAdmin(
  email: string,
  passwordHash: string,
  name?: string
): Promise<AdminUser> {
  await dbConnect();
  const doc = await AdminUserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { password_hash: passwordHash }, $setOnInsert: { name: name ?? null } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  return toAdmin(doc);
}
