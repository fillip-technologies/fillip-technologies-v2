import "server-only";
import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";

// Central Cloudinary client. Credentials come from the environment
// (CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET).
// Configuring is idempotent, so we just do it on import.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

// Folder under which all site assets live in the Cloudinary media library.
export const CLOUDINARY_FOLDER = "fillip";

// Folder under which admin CMS image uploads land (a sub-folder of the root).
// Only assets here are eligible for automatic cleanup on replace.
export const CLOUDINARY_UPLOADS_FOLDER = `${CLOUDINARY_FOLDER}/uploads`;

// Upload a raw file buffer and resolve to the uploaded asset's info.
export function uploadBuffer(
  buffer: Buffer,
  options: UploadApiOptions = {}
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: CLOUDINARY_FOLDER, resource_type: "image", ...options },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// Permanently delete one image asset by its public_id. Resolves to true when the
// asset was removed (or was already gone). Never throws — deletion is a
// best-effort cleanup and must not break the caller's main flow.
export async function destroyImage(publicId: string): Promise<boolean> {
  try {
    const res = await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
    return res.result === "ok" || res.result === "not found";
  } catch (err) {
    console.error(`Cloudinary destroy failed for ${publicId}:`, err);
    return false;
  }
}

/**
 * Turn a stored Cloudinary delivery URL into an *authenticated* download URL
 * (the `api.cloudinary.com/.../download` endpoint, signed with our API secret).
 *
 * Plain — even signed — delivery URLs return 401 for raw PDF/ZIP files when the
 * account's default "block PDF/ZIP delivery" security setting is on. The
 * authenticated download endpoint bypasses that restriction, so admin resume
 * downloads work without changing any Cloudinary settings.
 *
 * Returns the original URL unchanged if it doesn't look like a Cloudinary upload
 * URL (or if URL generation fails), so the caller can still attempt a plain fetch.
 */
export function authenticatedDownloadUrl(url: string): string {
  // .../<resource_type>/upload/[v1234/]<public_id>  — our resume uploads carry no
  // transformations, so everything after an optional version segment is the id.
  // For `raw` assets the public_id keeps its file extension.
  const match = url.match(/\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return url;
  const [, resourceType, publicId] = match;
  try {
    return cloudinary.utils.private_download_url(publicId, "", {
      resource_type: resourceType,
      type: "upload",
    });
  } catch {
    return url;
  }
}

/**
 * Best-effort deletion of an asset given its stored delivery URL (any resource
 * type). Used to clean up a career applicant's resume when their lead is
 * deleted. Never throws — cleanup must not break the caller's main flow.
 */
export async function destroyAssetByUrl(url: string): Promise<boolean> {
  const match = url.match(/\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return false;
  const [, resourceType, publicId] = match;
  try {
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return res.result === "ok" || res.result === "not found";
  } catch (err) {
    console.error(`Cloudinary destroy failed for ${publicId}:`, err);
    return false;
  }
}

export { cloudinary };
