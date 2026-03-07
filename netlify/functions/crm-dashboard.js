const { json } = require("./_lib/http");
const { getDashboardMetrics, ensureCrmSchema } = require("./_lib/crmStore");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (event.httpMethod !== "GET") {
      return json(405, { error: "Method not allowed" });
    }
    await ensureCrmSchema();
    const metrics = await getDashboardMetrics();
    return json(200, { ok: true, metrics });
  } catch (error) {
    return json(500, { error: "Failed to load dashboard metrics", details: error.message });
  }
};
