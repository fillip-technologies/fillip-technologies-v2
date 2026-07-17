import "server-only";

import { SiteContentModel } from "@/server/db/models";
import { destroyImage, isCloudinaryConfigured } from "@/server/cloudinary";

/**
 * Automatic cleanup of replaced CMS image uploads.
 *
 * When a content row is saved (via `upsertContent`), any Cloudinary *upload*
 * that was referenced by the previous version but is no longer referenced
 * ANYWHERE gets destroyed on Cloudinary. This keeps the media library from
 * accumulating orphans every time an admin swaps an image.
 *
 * Scope + safety:
 *   - Only `fillip/uploads/**` assets are eligible. These are created uniquely
 *     per upload (`/api/admin/upload`) and are only ever referenced from the
 *     database, so a global site_content scan is a complete reference check.
 *   - Migrated `fillip/images/**` and raw `fillip/resumes/**` are deliberately
 *     left alone (they may be referenced by static code or leads).
 *   - Best-effort: any failure is logged and swallowed so a save never breaks.
 */

// Matches an upload's version-independent public_id inside any string/URL, e.g.
// "https://res.cloudinary.com/x/image/upload/v123/fillip/uploads/abc.png"
// -> "fillip/uploads/abc". The char class stops before the extension.
const UPLOAD_PUBLIC_ID_RE = /fillip\/uploads\/[A-Za-z0-9_-]+/gi;

/** Collect the public_ids of every `fillip/uploads/*` asset referenced in a value. */
function uploadIdsIn(value: unknown): Set<string> {
  const out = new Set<string>();
  if (value == null) return out;
  const text = typeof value === "string" ? value : JSON.stringify(value);
  const matches = text.match(UPLOAD_PUBLIC_ID_RE);
  if (matches) for (const id of matches) out.add(id);
  return out;
}

/**
 * Delete uploads that `prevData` referenced but that are no longer referenced by
 * any site_content row (including the just-written one). Call AFTER the new data
 * has been persisted, so the scan reflects the current state.
 */
export async function cleanupReplacedUploads(prevData: unknown): Promise<void> {
  try {
    if (!isCloudinaryConfigured) return;

    const previousIds = uploadIdsIn(prevData);
    if (previousIds.size === 0) return; // nothing was referenced before → nothing to clean

    // Build the set of uploads still referenced anywhere in the CMS.
    const docs = await SiteContentModel.find({}, { data: 1 }).lean();
    const stillReferenced = new Set<string>();
    for (const doc of docs) {
      for (const id of uploadIdsIn(doc.data)) stillReferenced.add(id);
    }

    const orphaned = [...previousIds].filter((id) => !stillReferenced.has(id));
    if (orphaned.length === 0) return;

    await Promise.all(
      orphaned.map(async (id) => {
        const ok = await destroyImage(id);
        if (ok) console.log(`Cleaned up replaced upload: ${id}`);
      })
    );
  } catch (err) {
    // Cleanup is non-critical; never let it surface to the caller.
    console.error("cleanupReplacedUploads failed:", err);
  }
}
