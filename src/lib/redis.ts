import "server-only";
import Redis from "ioredis";

const g = globalThis as typeof globalThis & { _redisClient?: Redis | null };

export function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) return null;

  // Return existing client if already initialised in this process.
  if (g._redisClient !== undefined) return g._redisClient;

  try {
    const client = new Redis(process.env.REDIS_URL, {
      // Fail commands fast so a Redis hiccup doesn't stall a page render.
      maxRetriesPerRequest: 1,
      // Don't block the connect event before accepting commands.
      enableReadyCheck: false,
      // Connect on first command rather than at module load time.
      lazyConnect: true,
    });

    client.on("error", (err: Error) => {
      console.warn("[redis] connection error:", err.message);
    });

    g._redisClient = client;
  } catch (err) {
    console.warn("[redis] failed to initialise client:", err);
    g._redisClient = null;
  }

  return g._redisClient ?? null;
}
