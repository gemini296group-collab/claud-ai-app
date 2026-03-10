const https = require("https");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,apikey,x-app-role,Prefer");

  if (req.method === "OPTIONS") return res.status(200).end();

  const SUPABASE_URL = "https://hhmwxxksbgcnlphoepbr.supabase.co";
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

  const path = req.query.path || "/rest/v1/candidates?select=id&limit=1";
  const targetUrl = `${SUPABASE_URL}${path}`;

  try {
    const fetchRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": req.headers["prefer"] || "",
      },
      body: req.method !== "GET" && req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await fetchRes.text();
    res.status(fetchRes.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
