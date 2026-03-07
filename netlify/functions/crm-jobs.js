const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listJobs, saveJob } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const jobs = await listJobs();
      return json(200, { ok: true, jobs });
    }

    if (event.httpMethod === "POST") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const body = readJsonBody(event);
      const job = await saveJob(body.job || body);
      return json(200, { ok: true, job });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Jobs API failed", details: error.message });
  }
};
