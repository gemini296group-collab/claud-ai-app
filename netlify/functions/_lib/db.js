const { Pool } = require("pg");

const databaseUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing SUPABASE_DB_URL or DATABASE_URL environment variable.");
}

const pool = new Pool({
  connectionString: databaseUrl,
  max: 10,
  ssl: { rejectUnauthorized: false },
});

function sanitizeTableName(name, fallback) {
  const value = String(name || fallback || "applications").trim();
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
    return fallback;
  }
  return value;
}

async function upsertApplicationDriveFolderUrl(applicationId, driveFolderUrl) {
  const client = await pool.connect();
  try {
    const updated = await client.query(
      `UPDATE applications
         SET drive_folder_url = $2, updated_at = NOW()
       WHERE application_id = $1
       RETURNING id, application_id, drive_folder_url`,
      [applicationId, driveFolderUrl]
    );
    if (updated.rowCount) return updated.rows[0];

    await client.query(
      `CREATE TABLE IF NOT EXISTS application_drive_links (
         application_id TEXT PRIMARY KEY,
         drive_folder_url TEXT NOT NULL,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
       )`
    );
    const fallback = await client.query(
      `INSERT INTO application_drive_links(application_id, drive_folder_url, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (application_id)
       DO UPDATE SET drive_folder_url = EXCLUDED.drive_folder_url, updated_at = NOW()
       RETURNING application_id, drive_folder_url`,
      [applicationId, driveFolderUrl]
    );
    return fallback.rows[0] || null;
  } finally {
    client.release();
  }
}

async function insertApplicationDocument({ applicationId, driveFileId, driveFileUrl, fileName, mimeType, sizeBytes }) {
  const client = await pool.connect();
  try {
    const app = await client.query("SELECT id, candidate_id FROM applications WHERE application_id=$1 LIMIT 1", [applicationId]);
    if (app.rowCount) {
      const result = await client.query(
        `INSERT INTO documents(candidate_id, application_id, document_type, document_url, uploaded_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (application_id, document_type)
         DO UPDATE SET document_url = EXCLUDED.document_url, uploaded_at = NOW()
         RETURNING *`,
        [app.rows[0].candidate_id, app.rows[0].id, fileName || "document", driveFileUrl || ""]
      );
      return result.rows[0] || null;
    }

    await client.query(
      `CREATE TABLE IF NOT EXISTS application_documents (
         id BIGSERIAL PRIMARY KEY,
         application_id TEXT NOT NULL,
         drive_file_id TEXT,
         drive_file_url TEXT,
         file_name TEXT,
         mime_type TEXT,
         size_bytes BIGINT,
         created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
       )`
    );
    const fallback = await client.query(
      `INSERT INTO application_documents
      (application_id, drive_file_id, drive_file_url, file_name, mime_type, size_bytes, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *`,
      [applicationId, driveFileId, driveFileUrl, fileName, mimeType, sizeBytes]
    );
    return fallback.rows[0] || null;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  upsertApplicationDriveFolderUrl,
  insertApplicationDocument,
  sanitizeTableName,
};
