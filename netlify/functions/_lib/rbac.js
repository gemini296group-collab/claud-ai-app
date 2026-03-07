const ROLE_ADMIN = "admin";
const ROLE_STAFF = "staff";
const ROLE_AGENT = "agent";
const ROLE_SUB_AGENT = "sub_agent";
const ROLE_CUSTOMER = "customer";

function normalizeRole(value) {
  const v = String(value || "").trim().toLowerCase();
  if ([ROLE_ADMIN, ROLE_STAFF, ROLE_AGENT, ROLE_SUB_AGENT, ROLE_CUSTOMER].includes(v)) return v;
  return ROLE_CUSTOMER;
}

function getEventRole(event) {
  const headers = event && event.headers ? event.headers : {};
  return normalizeRole(
    headers["x-app-role"]
    || headers["X-App-Role"]
    || headers["x-user-role"]
    || headers["X-User-Role"]
    || process.env.DEFAULT_APP_ROLE
    || ROLE_ADMIN
  );
}

function getPermissions(role) {
  const r = normalizeRole(role);
  if (r === ROLE_ADMIN) {
    return {
      canManageUsers: true,
      canManageAgents: true,
      canManageCandidates: true,
      canManageApplications: true,
      canManageJobs: true,
      canManageDocuments: true,
      canManagePayments: true,
      canViewReports: true,
      canSubmitCandidatesOnly: false,
    };
  }
  if (r === ROLE_STAFF) {
    return {
      canManageUsers: false,
      canManageAgents: false,
      canManageCandidates: true,
      canManageApplications: true,
      canManageJobs: false,
      canManageDocuments: true,
      canManagePayments: true,
      canViewReports: true,
      canSubmitCandidatesOnly: false,
    };
  }
  if (r === ROLE_AGENT || r === ROLE_SUB_AGENT) {
    return {
      canManageUsers: false,
      canManageAgents: false,
      canManageCandidates: true,
      canManageApplications: false,
      canManageJobs: false,
      canManageDocuments: false,
      canManagePayments: false,
      canViewReports: false,
      canSubmitCandidatesOnly: true,
    };
  }
  return {
    canManageUsers: false,
    canManageAgents: false,
    canManageCandidates: false,
    canManageApplications: false,
    canManageJobs: false,
    canManageDocuments: false,
    canManagePayments: false,
    canViewReports: false,
    canSubmitCandidatesOnly: false,
  };
}

function ensureRole(event, predicate, message = "Forbidden") {
  const role = getEventRole(event);
  const permissions = getPermissions(role);
  if (!predicate({ role, permissions })) {
    const error = new Error(message);
    error.statusCode = 403;
    throw error;
  }
  return { role, permissions };
}

module.exports = {
  ROLE_ADMIN,
  ROLE_STAFF,
  ROLE_AGENT,
  ROLE_SUB_AGENT,
  ROLE_CUSTOMER,
  normalizeRole,
  getEventRole,
  getPermissions,
  ensureRole,
};
