const { json } = require("./_lib/http");
const { ensureCrmSchema, getReports } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (event.httpMethod !== "GET") {
      return json(405, { error: "Method not allowed" });
    }
    ensureRole(event, ({ permissions }) => permissions.canViewReports);
    await ensureCrmSchema();
    const reports = await getReports();
    return json(200, { ok: true, reports });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Reports API failed", details: error.message });
  }
};
