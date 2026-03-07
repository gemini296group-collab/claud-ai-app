const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listPayments, savePayment } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const payments = await listPayments();
      return json(200, { ok: true, payments });
    }

    if (event.httpMethod === "POST") {
      ensureRole(event, ({ permissions }) => permissions.canManagePayments);
      const body = readJsonBody(event);
      const payment = await savePayment(body.payment || body);
      return json(200, { ok: true, payment });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Payments API failed", details: error.message });
  }
};
