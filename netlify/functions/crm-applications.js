const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listApplications, saveApplication } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const applications = await listApplications();
      return json(200, { ok: true, applications });
    }

    if (event.httpMethod === "POST" || event.httpMethod === "PATCH") {
      ensureRole(event, ({ permissions }) => permissions.canManageApplications);
      const body = readJsonBody(event);
      const application = await saveApplication(body.application || body);
      return json(200, { ok: true, application });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Applications API failed", details: error.message });
  }
};
