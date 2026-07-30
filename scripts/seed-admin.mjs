// Seeds (or removes) admin users in the `admin_users` collection used by the
// admin panel login. Passwords are hashed with bcryptjs at 12 salt rounds, the
// same as src/server/auth/password.ts, so seeded accounts log in normally.
//
// Standalone (no `@/` alias) so it runs directly under Node, like db:migrate.
//
// Usage:
//   Seed an admin (idempotent upsert — updates the password if the email exists):
//     node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/seed-admin.mjs \
//       --email admin@example.com --password "s3cret" --name "Admin"
//
//   Values also fall back to env vars ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME.
//
//   Delete every admin user (clears the whole collection):
//     node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/seed-admin.mjs --delete-all
import dns from "node:dns";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

const SALT_ROUNDS = 12; // keep in sync with src/server/auth/password.ts

// Minimal argv parser: supports "--flag", "--key value" and "--key=value".
function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const body = token.slice(2);
    const eq = body.indexOf("=");
    if (eq !== -1) {
      args[body.slice(0, eq)] = body.slice(eq + 1);
    } else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
      args[body] = argv[++i];
    } else {
      args[body] = true; // bare flag
    }
  }
  return args;
}

async function deleteAllAdmins(collection) {
  const { deletedCount } = await collection.deleteMany({});
  console.log(`✓ Deleted ${deletedCount} admin user(s) from admin_users.`);
}

async function seedAdmin(collection, { email, password, name }) {
  if (!email || !password) {
    throw new Error(
      "Missing credentials. Pass --email and --password (or set ADMIN_EMAIL / ADMIN_PASSWORD)."
    );
  }

  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await collection.updateOne(
    { email: normalizedEmail },
    {
      $set: { email: normalizedEmail, password_hash: passwordHash },
      $setOnInsert: { name: name ?? null, created_at: new Date() },
    },
    { upsert: true }
  );

  console.log(
    result.upsertedCount > 0
      ? `✓ Created admin user ${normalizedEmail}.`
      : `✓ Updated password for existing admin user ${normalizedEmail}.`
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const collection = mongoose.connection.db.collection("admin_users");

  try {
    if (args["delete-all"]) {
      await deleteAllAdmins(collection);
    } else {
      await seedAdmin(collection, {
        email: args.email ?? process.env.ADMIN_EMAIL,
        password: args.password ?? process.env.ADMIN_PASSWORD,
        name: args.name ?? process.env.ADMIN_NAME,
      });
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error("✗ Admin seed failed:", err.message ?? err);
  process.exit(1);
});
