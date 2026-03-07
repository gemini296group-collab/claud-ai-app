const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listCandidates, saveCandidate } = require("./_lib/crmStore");
const { ensureRole, getEventRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff" || role === "agent" || role === "sub_agent");
      const candidates = await listCandidates();
      return json(200, { ok: true, candidates });
    }

    if (event.httpMethod === "POST") {
      const role = getEventRole(event);
      ensureRole(event, ({ permissions }) => permissions.canManageCandidates);
      const body = readJsonBody(event);
      const candidate = await saveCandidate(body.candidate || body, {
        role,
        name: body.actorName || "",
        email: body.actorEmail || "",
      });
      return json(200, { ok: true, candidate });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Candidates API failed", details: error.message });
  }
};
