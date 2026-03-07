const Busboy = require("busboy");
const { uploadDocumentToStorage } = require("./_lib/storage");
const { upsertApplicationDriveFolderUrl, insertApplicationDocument } = require("./_lib/db");
const { ensureCrmSchema, saveDocument } = require("./_lib/crmStore");
const { json, normalizeApplicationId, isValidApplicationId } = require("./_lib/http");

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB per file
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function documentTypeFromField(fieldName) {
  const map = {
    passportCopy: "passportCopy",
    idCopy: "idCopy",
    medicalReport: "medicalReport",
    ticketCopy: "ticketCopy",
    otherDocs: "otherDocs",
    cv: "cv",
    visaCopy: "visaCopy",
  };
  return map[fieldName] || "other";
}

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const contentType = event.headers["content-type"] || event.headers["Content-Type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      reject(new Error("Content-Type must be multipart/form-data"));
      return;
    }

    const busboy = Busboy({
      headers: { "content-type": contentType },
      limits: { fileSize: MAX_FILE_SIZE_BYTES, files: 12 },
    });

    const fields = {};
    const files = [];

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, fileStream, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      let totalSize = 0;
      let tooLarge = false;

      fileStream.on("data", (chunk) => {
        totalSize += chunk.length;
        if (totalSize > MAX_FILE_SIZE_BYTES) {
          tooLarge = true;
          return;
        }
        chunks.push(chunk);
      });

      fileStream.on("limit", () => {
        tooLarge = true;
      });

      fileStream.on("end", () => {
        if (!filename) return;
        if (tooLarge) {
          files.push({
            fieldName: name,
            filename,
            mimeType,
            error: "File too large",
          });
          return;
        }

        files.push({
          fieldName: name,
          filename,
          mimeType,
          size: totalSize,
          buffer: Buffer.concat(chunks),
        });
      });
    });

    busboy.on("error", reject);
    busboy.on("finish", () => resolve({ fields, files }));

    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : Buffer.from(event.body || "", "utf8");

    busboy.end(bodyBuffer);
  });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed" });
    }

    const { fields, files } = await parseMultipart(event);
    const applicationId = normalizeApplicationId(fields.applicationId);

    if (!isValidApplicationId(applicationId)) {
      return json(400, { error: "Invalid applicationId format. Expected: UR-05032026-0001" });
    }

    if (!files.length) {
      return json(400, { error: "No files received." });
    }
    await ensureCrmSchema();

    const uploadResults = [];
    let resolvedFolderUrl = "";

    for (const file of files) {
      if (file.error) {
        uploadResults.push({ fieldName: file.fieldName, fileName: file.filename, status: "rejected", error: file.error });
        continue;
      }

      if (!ALLOWED_MIME_TYPES.has(file.mimeType)) {
        uploadResults.push({
          fieldName: file.fieldName,
          fileName: file.filename,
          status: "rejected",
          error: `Unsupported type: ${file.mimeType}`,
        });
        continue;
      }

      const uploaded = await uploadDocumentToStorage({
        applicationId,
        fileName: file.filename,
        mimeType: file.mimeType,
        buffer: file.buffer,
      });

      resolvedFolderUrl = uploaded.folder.url;
      await insertApplicationDocument({
        applicationId,
        driveFileId: uploaded.file.id,
        driveFileUrl: uploaded.file.webViewLink || uploaded.file.webContentLink || "",
        fileName: uploaded.file.name,
        mimeType: uploaded.file.mimeType || file.mimeType,
        sizeBytes: Number(uploaded.file.size || file.size || 0),
      });
      await saveDocument({
        applicationId,
        documentType: documentTypeFromField(file.fieldName),
        documentUrl: uploaded.file.webViewLink || uploaded.file.webContentLink || "",
      });

      uploadResults.push({
        fieldName: file.fieldName,
        fileName: uploaded.file.name,
        status: "uploaded",
        driveFileId: uploaded.file.id,
        driveFileUrl: uploaded.file.webViewLink || uploaded.file.webContentLink || "",
      });
    }

    if (resolvedFolderUrl) {
      await upsertApplicationDriveFolderUrl(applicationId, resolvedFolderUrl);
    }

    return json(200, {
      ok: true,
      applicationId,
      driveFolderUrl: resolvedFolderUrl || null,
      files: uploadResults,
    });
  } catch (error) {
    return json(500, {
      error: "Document upload failed",
      details: error.message,
    });
  }
};
