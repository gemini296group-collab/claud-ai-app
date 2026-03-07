function json(statusCode, body) {
  const allowOrigin = process.env.CORS_ALLOW_ORIGIN || "*";
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Headers": "Content-Type, x-app-role, x-user-role, authorization",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      Vary: "Origin",
    },
    body: JSON.stringify(body),
  };
}

function readJsonBody(event) {
  if (!event.body) return {};
  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  return JSON.parse(raw);
}

function normalizeApplicationId(value) {
  return String(value || "").trim().toUpperCase();
}

function isValidApplicationId(value) {
  return /^[A-Z]{2}-\d{8}-\d{4}$/.test(value);
}

module.exports = {
  json,
  readJsonBody,
  normalizeApplicationId,
  isValidApplicationId,
};
