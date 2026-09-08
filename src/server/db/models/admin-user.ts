import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    name: { type: String, default: null },
    // Bumped every time the password changes. Baked into the session JWT and
    // re-checked on each request, so a password change invalidates all existing
    // sessions (the old token's version no longer matches this one).
    session_version: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "admin_users", versionKey: false }
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;
export const AdminUserModel: Model<AdminUserDoc> =
  (models.AdminUser as Model<AdminUserDoc>) ?? model<AdminUserDoc>("AdminUser", adminUserSchema);
