module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,apikey,x-client-info,Prefer,x-app-role");

  if (req.method === "OPTIONS") return res.status(200).end();

  const SUPABASE_URL = "https://hhmwxxksbgcnlphoepbr.supabase.co";
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Get the path after /api/proxy
  const proxyPath = req.url.replace(/^\/api\/proxy/, "") || "/";
  const targetUrl = `${SUPABASE_URL}${proxyPath}`;

  try {
    const headers = {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    };

    if (req.headers["prefer"]) headers["Prefer"] = req.headers["prefer"];
    if (req.headers["x-app-role"]) headers["x-app-role"] = req.headers["x-app-role"];

    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
