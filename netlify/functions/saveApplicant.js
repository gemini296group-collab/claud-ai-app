const { upsertApplicantFromLegacy } = require("./_lib/crmStore");
const { getEventRole } = require("./_lib/rbac");
const { readJsonBody } = require("./_lib/http");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const body = readJsonBody(event);
    const applicants = Array.isArray(body.applicants)
      ? body.applicants
      : body.applicant
        ? [body.applicant]
        : [];

    if (!applicants.length) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "No applicant data provided." }),
      };
    }

    const actorRole = getEventRole(event);
    const actor = {
      role: actorRole,
      name: body.actorName || "",
      email: body.actorEmail || "",
    };

    for (const applicant of applicants) {
      await upsertApplicantFromLegacy(applicant, actor);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ ok: true, count: applicants.length }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to save applicant(s)", details: error.message }),
    };
  }
};
