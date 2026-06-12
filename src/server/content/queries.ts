import { query } from "@/lib/db";

/**
 * Read a content row's JSON data, merged over the provided defaults so missing
 * keys always have a value. Safe to call from Server Components.
 */
export async function getContentData<T extends Record<string, unknown>>(
  key: string,
  defaults: T
): Promise<T> {
  const rows = await query<{ data: Record<string, unknown> }>(
    `SELECT data FROM site_content WHERE key = $1`,
    [key]
  );
  return { ...defaults, ...(rows[0]?.data ?? {}) };
}

/** Insert or update a content row's JSON payload. */
export async function upsertContent(
  key: string,
  data: Record<string, unknown>
): Promise<void> {
  await query(
    `INSERT INTO site_content (key, data, updated_at)
     VALUES ($1, $2::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [key, JSON.stringify(data)]
  );
}
