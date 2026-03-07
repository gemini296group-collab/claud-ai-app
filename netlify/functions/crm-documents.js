const { json, readJsonBody } = require("./_lib/http");
const { ensureCrmSchema, listDocuments, saveDocument } = require("./_lib/crmStore");
const { ensureRole } = require("./_lib/rbac");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    await ensureCrmSchema();

    if (event.httpMethod === "GET") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const documents = await listDocuments();
      return json(200, { ok: true, documents });
    }

    if (event.httpMethod === "POST") {
      ensureRole(event, ({ role }) => role === "admin" || role === "staff");
      const body = readJsonBody(event);
      const document = await saveDocument({
        applicationId: body.applicationId || body.application_id,
        candidateId: body.candidateId || body.candidate_id,
        documentType: body.documentType || body.document_type,
        documentUrl: body.documentUrl || body.document_url,
      });
      return json(200, { ok: true, document });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    return json(error.statusCode || 500, { error: "Documents API failed", details: error.message });
  }
};
