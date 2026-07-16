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

export { cloudinary };
