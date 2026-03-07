const { google } = require("googleapis");

const DRIVE_SCOPE = ["https://www.googleapis.com/auth/drive"];
let cachedDriveClient = null;

function parseServiceAccountJson() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable.");
  }

  try {
    return JSON.parse(raw);
  } catch {
    // Allow base64-encoded JSON fallback
    const decoded = Buffer.from(raw, "base64").toString("utf8");
    return JSON.parse(decoded);
  }
}

async function getDriveClient() {
  if (cachedDriveClient) return cachedDriveClient;

  const serviceAccount = parseServiceAccountJson();
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: DRIVE_SCOPE,
  });

  const authClient = await auth.getClient();
  cachedDriveClient = google.drive({ version: "v3", auth: authClient });
  return cachedDriveClient;
}

function buildFolderUrl(folderId) {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

async function findChildFolderByName(drive, parentFolderId, name) {
  const escapedName = String(name).replace(/'/g, "\\'");
  const q = [
    `name='${escapedName}'`,
    "mimeType='application/vnd.google-apps.folder'",
    "trashed=false",
    `'${parentFolderId}' in parents`,
  ].join(" and ");

  const res = await drive.files.list({
    q,
    spaces: "drive",
    fields: "files(id, name)",
    pageSize: 1,
  });

  return res.data.files && res.data.files.length ? res.data.files[0] : null;
}

async function createFolder(drive, parentFolderId, folderName) {
  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id, name",
  });

  return res.data;
}

async function ensureApplicationFolder(applicationId) {
  const parentFolderId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;
  if (!parentFolderId) {
    throw new Error("Missing GOOGLE_DRIVE_PARENT_FOLDER_ID environment variable.");
  }

  const drive = await getDriveClient();
  let folder = await findChildFolderByName(drive, parentFolderId, applicationId);
  if (!folder) {
    folder = await createFolder(drive, parentFolderId, applicationId);
  }

  return {
    id: folder.id,
    name: folder.name,
    url: buildFolderUrl(folder.id),
  };
}

async function uploadFileToApplicationFolder({ applicationId, fileName, mimeType, buffer }) {
  if (!Buffer.isBuffer(buffer) || !buffer.length) {
    throw new Error("Invalid file buffer.");
  }

  const drive = await getDriveClient();
  const folder = await ensureApplicationFolder(applicationId);

  const created = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folder.id],
    },
    media: {
      mimeType: mimeType || "application/octet-stream",
      body: Buffer.from(buffer),
    },
    fields: "id, name, webViewLink, webContentLink, mimeType, size",
  });

  return {
    folder,
    file: created.data,
  };
}

module.exports = {
  ensureApplicationFolder,
  uploadFileToApplicationFolder,
};
