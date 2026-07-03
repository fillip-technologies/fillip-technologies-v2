import dns from "node:dns";
import mongoose from "mongoose";

// Some networks/routers refuse the DNS SRV lookups that `mongodb+srv://` needs
// (Node's c-ares resolver then throws `querySrv ECONNREFUSED`). Setting an
// explicit resolver via DNS_SERVERS (e.g. "8.8.8.8,1.1.1.1") works around it.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

/**
 * A single shared Mongoose connection, created lazily on first use.
 *
 * In development Next.js clears the module cache on every change, which would
 * otherwise open a brand-new connection on each reload and exhaust the pool. We
 * cache the connection promise on `globalThis` to survive hot reloads.
 *
 * The connection is created lazily (not at import time) so importing this module
 * never throws — only an actual query requires MONGODB_URI to be set.
 */
const globalForDb = globalThis as unknown as {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const cache = globalForDb._mongoose ?? { conn: null, promise: null };
globalForDb._mongoose = cache;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
    }
    // bufferCommands:false surfaces connection errors instead of silently queueing.
    cache.promise = mongoose.connect(uri, { bufferCommands: false }).then((m) => m);
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
