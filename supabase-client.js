(function initAppSupabase(global) {
  var config = global.__APP_CONFIG__ || {};
  var supabaseUrl = String(config.SUPABASE_URL || "").trim();
  var supabaseAnonKey = String(config.SUPABASE_ANON_KEY || "").trim();
  var client = null;

  // Route all Supabase calls through Vercel proxy
  // This fixes Saudi Arabia / DNS blocking issues
  var proxyUrl = global.location.origin + "/api/proxy";

  var customFetch = function(url, options) {
    var modifiedUrl = String(url).replace(supabaseUrl, proxyUrl);
    return fetch(modifiedUrl, options);
  };

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
        fetch: customFetch,
        headers: {
          "x-client-info": "296-group-web",
        },
      },
    });
    return client;
  }

  global.appSupabase = {
    getClient: getClient,
    isReady: function() {
      return !!getClient();
    },
    config: {
      supabaseUrl: supabaseUrl,
      configured: !!supabaseUrl && !!supabaseAnonKey,
    },
  };
})(window);
