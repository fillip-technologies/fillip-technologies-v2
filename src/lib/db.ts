import dns from "node:dns";
import mongoose from "mongoose";

// Some networks/routers refuse the DNS SRV lookups that `mongodb+srv://` needs
// (Node's c-ares resolver then throws `querySrv ECONNREFUSED`). Setting an
// explicit resolver via DNS_SERVERS (e.g. "8.8.8.8,1.1.1.1") works around it.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}


const globalForDb = globalThis as unknown as {
  _mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    lastFailureAt: number;
  };
};

const cache = globalForDb._mongoose ?? { conn: null, promise: null, lastFailureAt: 0 };
globalForDb._mongoose = cache;

const serverSelectionTimeoutMS = Number(process.env.DB_CONNECT_TIMEOUT_MS ?? 2500);
const retryCooldownMS = Number(process.env.DB_RETRY_COOLDOWN_MS ?? 15_000);

export async function dbConnect(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise && Date.now() - cache.lastFailureAt < retryCooldownMS) {
    throw new Error("MongoDB connection is cooling down after a recent failure.");
  }

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
    }
    // bufferCommands:false surfaces connection errors instead of silently
    // queueing. serverSelectionTimeoutMS fails fast so snapshot-backed pages can
    // render from last-known-good content when Atlas/network access is flaky.
    cache.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS,
      })
      .then((m) => m);
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    cache.lastFailureAt = Date.now();
    throw err;
  }
  return cache.conn;
}
