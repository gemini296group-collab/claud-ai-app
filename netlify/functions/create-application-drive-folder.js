const { ensureApplicationFolder } = require("./_lib/googleDrive");
const { upsertApplicationDriveFolderUrl } = require("./_lib/db");
const { ensureCrmSchema } = require("./_lib/crmStore");
const { json, readJsonBody, normalizeApplicationId, isValidApplicationId } = require("./_lib/http");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed" });
    }

    const body = readJsonBody(event);
    const applicationId = normalizeApplicationId(body.applicationId);

    if (!isValidApplicationId(applicationId)) {
      return json(400, { error: "Invalid applicationId format. Expected: UR-05032026-0001" });
    }

    const folder = await ensureApplicationFolder(applicationId);
    await ensureCrmSchema();
    await upsertApplicationDriveFolderUrl(applicationId, folder.url);

    return json(200, {
      ok: true,
      applicationId,
      driveFolderId: folder.id,
      driveFolderUrl: folder.url,
    });
  } catch (error) {
    return json(500, {
      error: "Failed to create Drive folder",
      details: error.message,
    });
  }
};
