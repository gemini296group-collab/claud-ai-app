(function initAppSupabase(global) {
  const config = global.__APP_CONFIG__ || {};
  const supabaseUrl = String(config.SUPABASE_URL || config.supabaseUrl || "").trim();
  const supabaseAnonKey = String(config.SUPABASE_ANON_KEY || config.supabaseAnonKey || "").trim();
  let client = null;

  function getClient() {
    if (client) return client;
    if (!supabaseUrl || !supabaseAnonKey) return null;
    if (!global.supabase || typeof global.supabase.createClient !== "function") return null;
    client = global.supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          "x-client-info": "296-group-web",
        },
      },
    });
    return client;
  }

  global.appSupabase = {
    getClient,
    isReady() {
      return !!getClient();
    },
    config: {
      supabaseUrl,
      configured: !!supabaseUrl && !!supabaseAnonKey,
    },
  };
})(window);
