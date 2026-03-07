const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listAgents, saveAgent } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const agents = await listAgents();
      return json(200, { ok: true, agents });
    }

    if (event.httpMethod === "POST") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const body = readJsonBody(event);
      const agent = await saveAgent(body.agent || body);
      return json(200, { ok: true, agent });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Agents API failed", details: error.message });
  }
};
