const { uploadFileToApplicationFolder } = require("./googleDrive");

function sanitizeFileName(name) {
  return String(name || "file").replace(/[^a-zA-Z0-9._-]+/g, "_");
}

function hasSupabaseStorageConfig() {
  return Boolean(
    process.env.SUPABASE_URL
    && process.env.SUPABASE_SERVICE_ROLE_KEY
    && process.env.SUPABASE_STORAGE_BUCKET
  );
}

async function uploadToSupabaseStorage({ applicationId, fileName, mimeType, buffer }) {
  if (!hasSupabaseStorageConfig()) return null;
  const baseUrl = String(process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const bucket = String(process.env.SUPABASE_STORAGE_BUCKET || "").trim();
  const safe = sanitizeFileName(fileName);
  const objectPath = `${applicationId}/${Date.now()}_${safe}`;
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const uploadUrl = `${baseUrl}/storage/v1/object/${bucket}/${encodedPath}`;

  const resp = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Content-Type": mimeType || "application/octet-stream",
      "x-upsert": "true",
    },
    body: buffer,
  });

  if (!resp.ok) {
    const details = await resp.text();
    throw new Error(`Supabase Storage upload failed (${resp.status}): ${details.slice(0, 240)}`);
  }

  const publicBase = String(process.env.SUPABASE_STORAGE_PUBLIC_BASE_URL || "").trim();
  const publicUrl = publicBase
    ? `${publicBase.replace(/\/+$/, "")}/${bucket}/${objectPath}`
    : `${baseUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

  return {
    provider: "supabase_storage",
    folder: { id: bucket, url: `${baseUrl}/storage/v1/bucket/${bucket}` },
    file: {
      id: objectPath,
      name: safe,
      mimeType: mimeType || "application/octet-stream",
      size: buffer.length,
      webViewLink: publicUrl,
      webContentLink: publicUrl,
    },
  };
}

async function uploadDocumentToStorage({ applicationId, fileName, mimeType, buffer }) {
  const supabaseResult = await uploadToSupabaseStorage({ applicationId, fileName, mimeType, buffer });
  if (supabaseResult) return supabaseResult;
  const driveResult = await uploadFileToApplicationFolder({ applicationId, fileName, mimeType, buffer });
  return {
    provider: "google_drive",
    folder: driveResult.folder,
    file: driveResult.file,
  };
}

module.exports = {
  hasSupabaseStorageConfig,
  uploadDocumentToStorage,
};

