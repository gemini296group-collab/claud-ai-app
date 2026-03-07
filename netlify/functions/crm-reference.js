const { json } = require("./_lib/http");
const { ensureCrmSchema, listCountries, listCompanies } = require("./_lib/crmStore");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (event.httpMethod !== "GET") {
      return json(405, { error: "Method not allowed" });
    }
    await ensureCrmSchema();
    const [countries, companies] = await Promise.all([listCountries(), listCompanies()]);
    return json(200, { ok: true, countries, companies });
  } catch (error) {
    return json(500, { error: "Failed to load references", details: error.message });
  }
};
