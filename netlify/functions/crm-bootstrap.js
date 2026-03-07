const { json } = require("./_lib/http");
const { ensureCrmSchema } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (!["POST", "GET"].includes(event.httpMethod)) {
      return json(405, { error: "Method not allowed" });
    }
    ensureRole(event, ({ role }) => role === "admin", "Only admin can run bootstrap.");
    await ensureCrmSchema();
    return json(200, { ok: true, message: "CRM schema is ready." });
  } catch (error) {
    return json(error.statusCode || 500, { error: error.message || "Bootstrap failed" });
  }
};
