module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,apikey,x-client-info,Prefer,x-app-role");

  if (req.method === "OPTIONS") return res.status(200).end();

  const SUPABASE_URL = "https://hhmwxxksbgcnlphoepbr.supabase.co";
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Vercel passes :path* as req.query.path (array or string)
  let pathSegment = "";
  if (req.query && req.query.path) {
    pathSegment = Array.isArray(req.query.path)
      ? req.query.path.join("/")
      : req.query.path;
  }

  // Build query string (remove 'path' param)
  const queryParams = { ...req.query };
  delete queryParams.path;
  const queryString = Object.keys(queryParams).length
    ? "?" + new URLSearchParams(queryParams).toString()
    : "";

  const targetUrl = `${SUPABASE_URL}/${pathSegment}${queryString}`;

  try {
    const headers = {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    };

    if (req.headers["prefer"]) headers["Prefer"] = req.headers["prefer"];

    const fetchOptions = { method: req.method, headers };

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message, target: targetUrl });
  }
};
