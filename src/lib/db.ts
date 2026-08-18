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
  _mongooseErrorHandlerAttached?: boolean;
};

const cache = globalForDb._mongoose ?? { conn: null, promise: null, lastFailureAt: 0 };
globalForDb._mongoose = cache;

// Mongoose emits "error" on the connection when a socket drops post-connect
// (e.g. Atlas reaping an idle connection overnight). A Node EventEmitter that
// emits "error" with no listener attached throws it as an uncaught exception,
// which kills the whole process — not just the one failed query. That's what
// was taking the entire site down and requiring a manual restart. Attaching a
// listener (once, surviving dev hot-reload via globalThis) turns that into a
// logged warning instead; dbConnect()'s readyState check already handles
// reconnecting on the next request.
if (!globalForDb._mongooseErrorHandlerAttached) {
  mongoose.connection.on("error", (err) => {
    console.warn("[db] MongoDB connection error (will reconnect on next request):", err);
  });
  globalForDb._mongooseErrorHandlerAttached = true;
}

// A little headroom (5s) absorbs a normal Atlas cold-start / transient blip
// without tripping the cooldown, while still failing fast enough for snapshot
// pages. The cooldown is short (3s) so a recovered DB is picked back up quickly
// instead of being locked out for a long window after a single failure.
const serverSelectionTimeoutMS = Number(process.env.DB_CONNECT_TIMEOUT_MS ?? 5_000);
const retryCooldownMS = Number(process.env.DB_RETRY_COOLDOWN_MS ?? 3_000);

export async function dbConnect(): Promise<typeof mongoose> {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting.
  // A cached mongoose instance can go stale when the Atlas socket is reaped during
  // idle periods (overnight low traffic + NAT/firewall). Returning it blindly makes
  // every query throw (bufferCommands:false) until a manual restart, which surfaces
  // as a 404 on every DB-driven route. Only trust the cache while it's connected.
  if (cache.conn && cache.conn.connection.readyState === 1) return cache.conn;

  // Stale/dead connection — clear it so we re-establish a fresh one below.
  if (cache.conn) {
    cache.conn = null;
    cache.promise = null;
  }

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
