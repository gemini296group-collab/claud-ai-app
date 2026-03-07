const { listApplicantsLegacy } = require("./_lib/crmStore");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const applicants = await listApplicantsLegacy();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        ok: true,
        count: applicants.length,
        applicants,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "Failed to fetch applicants", details: error.message }),
    };
  }
};
