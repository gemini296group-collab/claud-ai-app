const APP_KEYS = {
  customers: "app296_customers",
  settings: "app296_settings",
  notifications: "app296_notifications",
  customTrades: "app296_custom_trades",
  staff: "app296_staff",
  services: "app296_services_catalog",
  companyProfiles: "app296_company_profiles",
  socialLinks: "app296_social_links",
  session: "app296_session",
  loginHistory: "app296_login_history",
  candidatesCache: "app296_candidates_cache",
  companiesCache: "app296_companies_cache",
  agentsCache: "app296_agents_cache",
  pendingCandidates: "app296_pending_candidates",
  pendingCandidateDeletes: "app296_pending_candidate_deletes",
  pendingCompanies: "app296_pending_companies",
  pendingAgents: "app296_pending_agents",
};

const defaultSettings = {
  adminPassword: "Admin@296",
  staffCode: "Staff@296",
  show296ForStaff: false,
  show296ForCustomer: false,
  showTravelNama: true,
  showUmeed: true,
  driveUrl: "",
  sheetsUrl: "",
  showStaffEmailContact: true,
  showStaffPayments: true,
  showStaffDocuments: true,
  showStaffSponsorDetails: false,
  showCustomerPaymentDetails: true,
  showCustomerTravelDate: true,
  showCustomerVisaCountry: true,
  showCustomerDocuments: true,
  googleClientId: "",
  driveFolderName: "296 Group App Data",
  autoDriveSync: false,
};

const state = {
  lang: "en",
  role: "admin",
  tab: "dashboard",
  user: null,
  pendingEditSerial: null,
};

const driveState = {
  tokenClient: null,
  accessToken: "",
  folderId: "",
  docsFolderId: "",
  loadingPromise: null,
};

const texts = {
  en: {
    title: "296 Group Business Portal",
    subtitle: "Travel Nama | Umeed e Rozgar | 296 Group Admin",
    signIn: "Sign In",
    login: "Login",
    logout: "Logout",
    adminPass: "Admin Password",
    staffEmail: "Staff Email (optional)",
    staffCode: "Staff Access Code",
    customerEmail: "Customer Email / Application ID",
    dashboard: "Dashboard",
    companies: "Companies",
    databank: "Data Bank",
    reports: "Reports",
    settings: "Settings",
    notifications: "Notifications",
    addCustomer: "Add New Customer",
    customerList: "Customer List",
    support: "Customer Support",
    customerPortal: "Customer Portal",
    applications: "Applications",
    agents: "Agents",
    candidates: "Candidates",
    jobDemands: "Job Demands",
    documents: "Documents",
    payments: "Payments",
    staffManagement: "Staff Management",
    trackApplication: "Track Application",
    applyNow: "Apply Now",
    newApplication: "New Application",
    serviceCatalog: "Services",
    roleAdmin: "Admin",
    roleStaff: "Staff",
    roleCustomer: "Customer",
    adminPassPlaceholder: "Enter admin password",
    staffEmailPlaceholder: "staff@email.com",
    staffCodePlaceholder: "Enter staff code",
    customerEmailPlaceholder: "name@email.com or TN-05032026-0001",
    wrongAdminPass: "Wrong admin password.",
    wrongStaffCode: "Wrong staff code.",
    emailRequired: "Email required.",
    customerNotFound: "Application ID not found. If you login with a valid email, a new application will be created automatically.",
    langUrdu: "\u0627\u0631\u062f\u0648",
    langEnglish: "English",
  },
  ur: {
    title: "\u0032\u0039\u0036 \u06af\u0631\u0648\u067e \u0628\u0632\u0646\u0633 \u067e\u0648\u0631\u0679\u0644",
    subtitle: "\u0679\u0631\u06cc\u0648\u0644 \u0646\u0627\u0645\u06c1 | \u0627\u0645\u06cc\u062f\u0650 \u0631\u0648\u0632\u06af\u0627\u0631 | \u0032\u0039\u0036 \u06af\u0631\u0648\u067e \u0627\u06cc\u0688\u0645\u0646",
    signIn: "\u0644\u0627\u06af \u0627\u0650\u0646",
    login: "\u0644\u0627\u06af \u0627\u0650\u0646",
    logout: "\u0644\u0627\u06af \u0622\u0624\u0679",
    adminPass: "\u0627\u06cc\u0688\u0645\u0646 \u067e\u0627\u0633 \u0648\u0631\u0688",
    staffEmail: "\u0627\u0633\u0679\u0627\u0641 \u0627\u06cc \u0645\u06cc\u0644 (\u0627\u062e\u062a\u06cc\u0627\u0631\u06cc)",
    staffCode: "\u0627\u0633\u0679\u0627\u0641 \u0631\u0633\u0627\u0626\u06cc \u06a9\u0648\u0688",
    customerEmail: "\u06a9\u0633\u0679\u0645\u0631 \u0627\u06cc \u0645\u06cc\u0644 / Application ID",
    dashboard: "\u0688\u06cc\u0634 \u0628\u0648\u0631\u0688",
    companies: "\u06a9\u0645\u067e\u0646\u06cc\u0627\u06ba",
    databank: "\u0688\u06cc\u0679\u0627 \u0628\u06cc\u0646\u06a9",
    reports: "\u0631\u067e\u0648\u0631\u0679\u0633",
    settings: "\u0633\u06cc\u0679\u0646\u06af\u0632",
    notifications: "\u0646\u0648\u0679\u06cc\u0641\u06a9\u06cc\u0634\u0646\u0632",
    addCustomer: "\u0646\u06cc\u0627 \u06a9\u0633\u0679\u0645\u0631 \u0634\u0627\u0645\u0644 \u06a9\u0631\u06cc\u06ba",
    customerList: "\u06a9\u0633\u0679\u0645\u0631 \u0644\u0633\u0679",
    support: "\u06a9\u0633\u0679\u0645\u0631 \u0633\u067e\u0648\u0631\u0679",
    customerPortal: "\u06a9\u0633\u0679\u0645\u0631 \u067e\u0648\u0631\u0679\u0644",
    applications: "\u062f\u0631\u062e\u0648\u0627\u0633\u062a\u06cc\u06ba",
    agents: "Agents",
    candidates: "Candidates",
    jobDemands: "Job Demands",
    documents: "Documents",
    payments: "Payments",
    staffManagement: "\u0627\u0633\u0679\u0627\u0641 \u0645\u06cc\u0646\u062c\u0645\u0646\u0679",
    trackApplication: "\u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0679\u0631\u06cc\u06a9 \u06a9\u0631\u06cc\u06ba",
    applyNow: "\u0627\u0628\u06be\u06cc \u0627\u067e\u0644\u0627\u0626\u06cc \u06a9\u0631\u06cc\u06ba",
    newApplication: "\u0646\u0626\u06cc \u062f\u0631\u062e\u0648\u0627\u0633\u062a",
    serviceCatalog: "\u0633\u0631\u0648\u0633\u0632",
    roleAdmin: "\u0627\u06cc\u0688\u0645\u0646",
    roleStaff: "\u0627\u0633\u0679\u0627\u0641",
    roleCustomer: "\u06a9\u0633\u0679\u0645\u0631",
    adminPassPlaceholder: "\u0627\u06cc\u0688\u0645\u0646 \u067e\u0627\u0633 \u0648\u0631\u0688 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
    staffEmailPlaceholder: "staff@email.com",
    staffCodePlaceholder: "\u0627\u0633\u0679\u0627\u0641 \u06a9\u0648\u0688 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
    customerEmailPlaceholder: "name@email.com or TN-05032026-0001",
    wrongAdminPass: "\u0627\u06cc\u0688\u0645\u0646 \u067e\u0627\u0633 \u0648\u0631\u0688 \u063a\u0644\u0637 \u06c1\u06d2\u06d4",
    wrongStaffCode: "\u0627\u0633\u0679\u0627\u0641 \u06a9\u0648\u0688 \u063a\u0644\u0637 \u06c1\u06d2\u06d4",
    emailRequired: "\u0627\u06cc \u0645\u06cc\u0644 \u0636\u0631\u0648\u0631\u06cc \u06c1\u06d2\u06d4",
    customerNotFound: "Application ID not found. Valid email se login karne par new application khud create ho jayegi.",
    langUrdu: "\u0627\u0631\u062f\u0648",
    langEnglish: "English",
  },
};

const companyData = [
  {
    key: "travel",
    name: "Travel Nama",
    phone: "+923101111296",
    description: "Travel and tourist solutions including tickets, hotels, visit visa and Umrah packages.",
    services: [
      { name: "Ticket Price Search", photo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=60" },
      { name: "Hotel Booking", photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=60" },
      { name: "Visit Visa", photo: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=700&q=60" },
      { name: "Umrah Package", photo: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=700&q=60" },
    ],
  },
  {
    key: "umeed",
    name: "Umeed e Rozgar",
    phone: "+923317174296",
    description: "Overseas and local recruitment, work visa processing and consultancy services.",
    services: [
      { name: "Work Visa", photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=60" },
      { name: "NAVTTC Appointment", photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=60" },
      { name: "GAMCA/Wafid Medical", photo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=700&q=60" },
      { name: "Pak Soft Skill Certificate", photo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=60" },
      { name: "Online E-Protector", photo: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=700&q=60" },
      { name: "Thasheer Appointment", photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=60" },
    ],
  },
  {
    key: "group296",
    name: "296 Group (Admin Internal)",
    phone: "+923391111296",
    description: "Main business management company for administration, reporting, and control.",
    services: [
      { name: "Sales Oversight", photo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=60" },
      { name: "Company Control", photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=60" },
      { name: "Data Governance", photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=60" },
    ],
  },
];

const GCC_COUNTRIES = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const ALL_COUNTRIES = [
  ...GCC_COUNTRIES,
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Azerbaijan",
  "Bangladesh", "Belgium", "Brazil", "Brunei", "Canada", "China", "Denmark", "Egypt",
  "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Lebanon",
  "Libya", "Malaysia", "Maldives", "Morocco", "Nepal", "Netherlands", "New Zealand",
  "Nigeria", "Norway", "Pakistan", "Philippines", "Poland", "Portugal", "Romania", "Russia",
  "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
  "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Uzbekistan", "Vietnam",
].filter((v, i, arr) => arr.indexOf(v) === i);

const STATUS_OPTIONS = [
  "New Lead",
  "Applied",
  "Documents Pending",
  "Documents Submitted",
  "Under Process",
  "Medical Scheduled",
  "Medical Passed",
  "Medical Failed",
  "Interview Scheduled",
  "Interview Passed",
  "Interview Failed",
  "Visa Approved",
  "Visa Rejected",
  "Ticket Issued",
  "Travelled",
  "Completed",
  "Cancelled",
  "Refund Requested",
  "Refund Processed",
];

const CRM_STAGE_OPTIONS = [
  "Application",
  "Documents Submitted",
  "Client Selection",
  "Medical",
  "Embassy",
  "Visa Issued",
  "Ticket",
];

const VISIT_VISA_TYPES = [
  "Tourist Visa",
  "Family Visit Visa",
  "Business Visit Visa",
  "Medical Visit Visa",
  "Conference/Event Visit Visa",
  "Transit Visa",
];

const WORK_VISA_TYPES = [
  "General Employment Visa",
  "Skilled Worker Visa",
  "Professional Worker Visa",
  "Domestic Worker Visa",
  "Construction Worker Visa",
  "Driver Work Visa",
  "Factory Worker Visa",
  "Agriculture Worker Visa",
  "Nursing/Healthcare Work Visa",
  "Seasonal Work Visa",
];

const UMRAH_VISA_TYPES = [
  "Umrah Visa (Single Entry)",
  "Umrah Package Visa",
  "Family Umrah Visa",
];

const WORK_REQUIRED_DOCS_BASE = [
  "Passport (minimum 6 months validity)",
  "National ID copy",
  "Passport size photos (white background)",
  "Updated CV / Resume",
  "Educational certificates",
  "Experience certificates",
  "Police character certificate",
  "Medical fitness report (GAMCA/Wafid where required)",
];

const UMRAH_REQUIRED_DOCS_BASE = [
  "Passport (minimum 6 months validity)",
  "National ID copy",
  "Passport size photos",
  "Vaccination certificate (as per policy)",
  "Confirmed Umrah package booking",
  "Return ticket / itinerary",
];

const SERVICE_REQUIRED_DOCS_MAP = {
  "ticket price search": ["Valid passport copy"],
  "hotel booking": ["Passport copy", "Travel dates confirmation"],
  "visit visa": ["Passport copy", "Bank statement", "Travel plan"],
  "umrah package": ["Passport copy", "Vaccination certificate", "Package confirmation"],
  "work visa": ["Passport", "CV", "Educational/Experience certificates", "Medical report"],
  "navttc appointment": ["CNIC copy", "Educational documents"],
  "gamca/wafid medical": ["Passport copy", "Photograph", "Medical appointment slip"],
  "pak soft skill certificate": ["CNIC copy", "Photo", "Basic qualification proof"],
  "online e-protector": ["Passport", "Visa copy", "Employment contract"],
  "thasheer appointment": ["Passport", "Visa reference / invitation", "Photo"],
};

const VISIT_REQUIRED_DOCS_BASE = [
  "Passport (minimum 6 months validity)",
  "Recent passport size photos",
  "National ID copy",
  "Bank statement (3-6 months)",
  "Return ticket reservation",
  "Hotel booking or host accommodation proof",
];

const VISIT_COUNTRY_REQUIREMENTS = {
  "Saudi Arabia": [
    "Host invitation/MOI reference (if family/business visit)",
    "Relationship proof for family visit",
  ],
  "United Arab Emirates": [
    "Sponsor details or hotel proof",
    "Confirmed travel insurance",
  ],
  "Qatar": [
    "Host/sponsor information",
    "Travel insurance coverage",
  ],
  "Kuwait": [
    "Sponsor/host invitation details",
    "Return travel plan",
  ],
  "Bahrain": [
    "Accommodation proof",
    "Travel insurance",
  ],
  "Oman": [
    "Accommodation and return ticket proof",
    "Financial support evidence",
  ],
};

const OVERSEAS_DEMAND_OPTIONS = [
  "No New Demand",
  "New Overseas Visa Demand",
  "Urgent Overseas Demand",
  "Bulk Employer Demand",
  "Seasonal Visa Demand",
];

const TRADE_OPTIONS = [
  "Account Executive",
  "Accountant",
  "AC Technician",
  "Actor",
  "Administrative Assistant",
  "Agricultural Engineer",
  "Agricultural Worker",
  "Airline Ground Staff",
  "Aircraft Cleaner",
  "Aircraft Mechanic",
  "Ambulance Driver",
  "Animator",
  "App Developer",
  "Architect",
  "Area Manager",
  "Assistant Manager",
  "Auditor",
  "Auto Body Technician",
  "Auto Electrician",
  "Auto Mechanic",
  "Baker",
  "Barber",
  "Barista",
  "Beautician",
  "Biomedical Technician",
  "Blacksmith",
  "Boiler Operator",
  "Bricklayer",
  "Building Maintenance Technician",
  "Business Analyst",
  "Butcher",
  "Cabin Crew",
  "CAD Designer",
  "Carpenter",
  "Cashier",
  "Catering Supervisor",
  "CCTV Technician",
  "Ceramic Tile Installer",
  "Chef",
  "Chemical Engineer",
  "Chef de Partie",
  "Chief Accountant",
  "Civil Engineer",
  "Civil Foreman",
  "Cleaner",
  "Client Relations Officer",
  "Clinical Technician",
  "Cloud Engineer",
  "Computer Operator",
  "Construction Labor",
  "Construction Manager",
  "Content Writer",
  "Cook",
  "Courier",
  "Crane Operator",
  "Customer Service Representative",
  "Cybersecurity Analyst",
  "Data Analyst",
  "Data Entry Operator",
  "Delivery Driver",
  "Dentist",
  "Dental Assistant",
  "Digital Marketing Specialist",
  "Dispatch Officer",
  "Doctor",
  "Document Controller",
  "Draftsman",
  "Driver",
  "Driller",
  "Drywall Installer",
  "E-commerce Specialist",
  "Electrical Engineer",
  "Electrician",
  "Electronics Technician",
  "Embroidery Worker",
  "Estimator",
  "Event Coordinator",
  "Factory Supervisor",
  "Factory Worker",
  "Farm Manager",
  "Farm Worker",
  "Fashion Designer",
  "Field Technician",
  "Firefighter",
  "Fitter",
  "Fleet Coordinator",
  "Flooring Installer",
  "Food Packer",
  "Food Safety Officer",
  "Forklift Operator",
  "Front Office Executive",
  "Gardener",
  "General Helper",
  "General Labor",
  "Graphic Designer",
  "Hair Stylist",
  "Head Waiter",
  "Heavy Driver",
  "Heavy Equipment Operator",
  "Helper",
  "Hospitality Supervisor",
  "Hotel Receptionist",
  "Housekeeping Staff",
  "HR Manager",
  "HR Officer",
  "HVAC Technician",
  "Industrial Electrician",
  "Industrial Engineer",
  "Information Security Officer",
  "Instrumentation Technician",
  "Interior Designer",
  "Inventory Controller",
  "IT Support Engineer",
  "IT Technician",
  "Java Developer",
  "Kitchen Helper",
  "Lab Technician",
  "Landscape Technician",
  "Lawyer",
  "Light Driver",
  "Loading Unloading Worker",
  "Logistics Coordinator",
  "Machine Operator",
  "Machinist",
  "Maintenance Supervisor",
  "Manager",
  "Marine Engineer",
  "Marketing Executive",
  "Mason",
  "Mechanical Engineer",
  "Mechanical Fitter",
  "Medical Coder",
  "Medical Technician",
  "Merchandiser",
  "MIG Welder",
  "Mobile Phone Technician",
  "Network Engineer",
  "Nurse",
  "Office Assistant",
  "Operations Manager",
  "Painter",
  "Pastry Chef",
  "Pharmacist",
  "Pharmacist Assistant",
  "Photographer",
  "Physiotherapist",
  "Pipe Fitter",
  "Plumber",
  "Plumbing Foreman",
  "Power Plant Technician",
  "Procurement Officer",
  "Production Supervisor",
  "Project Coordinator",
  "Project Manager",
  "QA Inspector",
  "QC Inspector",
  "Quantity Surveyor",
  "Receptionist",
  "Recruitment Officer",
  "Restaurant Manager",
  "Rigging Supervisor",
  "Safety Officer",
  "Sales Executive",
  "Salesman",
  "School Teacher",
  "Security Guard",
  "Senior Accountant",
  "SEO Specialist",
  "Shuttering Carpenter",
  "Site Engineer",
  "Site Supervisor",
  "Social Media Manager",
  "Software Engineer",
  "Solar Technician",
  "Spray Painter",
  "Staff Nurse",
  "Steel Fixer",
  "Storekeeper",
  "Supply Chain Officer",
  "Supervisor",
  "Tailor",
  "Teacher",
  "Technical Support Specialist",
  "Telecaller",
  "Tile Mason",
  "Tour Guide",
  "Trainer",
  "Travel Consultant",
  "UI UX Designer",
  "Urgent Care Assistant",
  "Video Editor",
  "Waiter",
  "Warehouse Supervisor",
  "Warehouse Worker",
  "Web Developer",
  "Welder",
  "Workshop Manager",
  "X-Ray Technician",
  "Youth Counselor",
  "Zinc Coating Technician",
  "Other",
];

function customTrades() {
  return load(APP_KEYS.customTrades, []);
}

function saveCustomTrades(list) {
  const unique = list
    .map((x) => String(x || "").trim())
    .filter(Boolean)
    .filter((v, i, arr) => arr.findIndex((a) => a.toLowerCase() === v.toLowerCase()) === i);
  save(APP_KEYS.customTrades, unique);
}

function allTradeOptions() {
  const base = TRADE_OPTIONS.filter((x) => x !== "Other");
  const custom = customTrades();
  const merged = [...base, ...custom]
    .filter((v, i, arr) => arr.findIndex((a) => a.toLowerCase() === v.toLowerCase()) === i)
    .sort((a, b) => a.localeCompare(b));
  return [...merged, "Other"];
}

const refs = {
  roleSelect: document.getElementById("roleSelect"),
  publicHome: document.getElementById("publicHome"),
  publicHomeBtn: document.getElementById("publicHomeBtn"),
  publicCompaniesWrap: document.getElementById("publicCompaniesWrap"),
  publicApplyNowBtn: document.getElementById("publicApplyNowBtn"),
  publicTrackNavBtn: document.getElementById("publicTrackNavBtn"),
  publicTrackJumpBtn: document.getElementById("publicTrackJumpBtn"),
  publicTrackBlock: document.getElementById("publicTrackBlock"),
  publicApplySection: document.getElementById("publicApplySection"),
  publicApplyForm: document.getElementById("publicApplyForm"),
  publicApplyCancelBtn: document.getElementById("publicApplyCancelBtn"),
  publicVisitVisaType: document.getElementById("publicVisitVisaType"),
  publicVisitRequiredDocs: document.getElementById("publicVisitRequiredDocs"),
  publicTrackInput: document.getElementById("publicTrackInput"),
  publicTrackBtn: document.getElementById("publicTrackBtn"),
  publicTrackResult: document.getElementById("publicTrackResult"),
  publicAdminLoginBtn: document.getElementById("publicAdminLoginBtn"),
  publicStaffLoginBtn: document.getElementById("publicStaffLoginBtn"),
  publicCustomerLoginBtn: document.getElementById("publicCustomerLoginBtn"),
  loginCard: document.getElementById("loginCard"),
  appPanel: document.getElementById("appPanel"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  adminPassword: document.getElementById("adminPassword"),
  staffEmail: document.getElementById("staffEmail"),
  staffCode: document.getElementById("staffCode"),
  customerEmail: document.getElementById("customerEmail"),
  adminLoginBlock: document.getElementById("adminLoginBlock"),
  staffLoginBlock: document.getElementById("staffLoginBlock"),
  customerLoginBlock: document.getElementById("customerLoginBlock"),
  loginHint: document.getElementById("loginHint"),
  langToggle: document.getElementById("langToggle"),
  tabs: document.getElementById("tabs"),
  panelContent: document.getElementById("panelContent"),
  installBtn: document.getElementById("installBtn"),
  installHintCard: document.getElementById("installHintCard"),
  installHintText: document.getElementById("installHintText"),
  installNowBtn: document.getElementById("installNowBtn"),
  installCloseBtn: document.getElementById("installCloseBtn"),
};

let deferredInstallPrompt = null;
let installCardDismissed = false;

const runtimeStore = {};
let applicantsSyncTimeout = null;
let applicantRefreshTimer = null;
let pendingSupabaseSyncPromise = null;
const STAFF_IDLE_LIMIT_MS = 15 * 60 * 1000;
const LOGIN_HISTORY_LIMIT = 400;
let idleLogoutTimer = null;
let lastPrivilegedActivityAt = 0;
let sessionActivityBound = false;
let sessionActivityHandler = null;

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function safeStorageGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return cloneValue(fallback);
    return JSON.parse(raw);
  } catch {
    return cloneValue(fallback);
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write errors.
  }
}

function safeStorageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage removal errors.
  }
}

function isPrivilegedRole(role) {
  const r = String(role || "").toLowerCase();
  return r === "admin" || r === "staff";
}

function isPrivilegedUser(user = state.user) {
  return isPrivilegedRole(user?.role);
}

function displayUserName(user = {}) {
  const role = String(user.role || "").toLowerCase();
  if (role === "admin") return "Admin";
  if (role === "staff") return String(user.staffName || user.id || "Staff");
  return String(user.email || user.id || "Customer");
}

function loadLoginHistory() {
  const list = safeStorageGet(APP_KEYS.loginHistory, []);
  return Array.isArray(list) ? list : [];
}

function saveLoginHistory(list) {
  safeStorageSet(APP_KEYS.loginHistory, Array.isArray(list) ? list.slice(0, LOGIN_HISTORY_LIMIT) : []);
}

function addLoginHistory(action, user, details = "") {
  if (!user || !user.role) return;
  const entry = {
    at: new Date().toISOString(),
    action: String(action || "event"),
    role: String(user.role || ""),
    userId: String(user.id || ""),
    name: displayUserName(user),
    details: String(details || ""),
  };
  const history = loadLoginHistory();
  history.unshift(entry);
  saveLoginHistory(history);
}

function clearIdleLogoutTimer() {
  if (idleLogoutTimer) {
    clearTimeout(idleLogoutTimer);
    idleLogoutTimer = null;
  }
}

function clearApplicantRefreshTimer() {
  if (applicantRefreshTimer) {
    clearInterval(applicantRefreshTimer);
    applicantRefreshTimer = null;
  }
}

function persistSessionState() {
  if (!state.user) {
    safeStorageRemove(APP_KEYS.session);
    return;
  }
  const payload = {
    user: state.user,
    tab: state.tab,
    lang: state.lang,
    lastPrivilegedActivityAt,
    savedAt: Date.now(),
  };
  safeStorageSet(APP_KEYS.session, payload);
}

function handleIdleAutoLogout() {
  if (!isPrivilegedUser() || !state.user) return;
  const snapshot = { ...state.user };
  addLoginHistory("auto_logout", snapshot, "Session expired after 15 minutes inactivity");
  logout({
    skipHistory: true,
    hintMessage: "Session expired after 15 minutes inactivity. Please login again.",
  });
}

function scheduleIdleLogoutTimer() {
  clearIdleLogoutTimer();
  if (!isPrivilegedUser()) return;
  const elapsed = Date.now() - Number(lastPrivilegedActivityAt || 0);
  const remaining = STAFF_IDLE_LIMIT_MS - elapsed;
  if (remaining <= 0) {
    handleIdleAutoLogout();
    return;
  }
  idleLogoutTimer = setTimeout(handleIdleAutoLogout, remaining + 50);
}

function touchPrivilegedActivity() {
  if (!isPrivilegedUser()) return;
  lastPrivilegedActivityAt = Date.now();
  persistSessionState();
  scheduleIdleLogoutTimer();
}

function bindSessionActivity() {
  if (sessionActivityBound) return;
  const events = ["click", "keydown", "mousemove", "touchstart", "scroll"];
  sessionActivityHandler = () => {
    touchPrivilegedActivity();
  };
  events.forEach((eventName) => {
    window.addEventListener(eventName, sessionActivityHandler, { passive: true });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") touchPrivilegedActivity();
  });
  sessionActivityBound = true;
}

function startSessionGuards() {
  bindSessionActivity();
  if (isPrivilegedUser()) {
    touchPrivilegedActivity();
  } else {
    clearIdleLogoutTimer();
    persistSessionState();
  }
  clearApplicantRefreshTimer();
  if (isPrivilegedUser()) {
    applicantRefreshTimer = setInterval(async () => {
      const latest = await fetchApplicantsFromServer();
      if (!Array.isArray(latest)) return;
      runtimeStore[APP_KEYS.customers] = cloneValue(latest);
      if (["dashboard", "candidates", "applications", "reports", "notifications"].includes(String(state.tab || ""))) {
        renderTab();
      }
    }, 30000);
  }
}

function restoreSessionFromStorage() {
  const session = safeStorageGet(APP_KEYS.session, null);
  if (!session || typeof session !== "object" || !session.user) return false;
  const user = session.user;
  const role = String(user.role || "").toLowerCase();
  if (!role) return false;
  if (role === "staff" && !user.permissions) {
    user.permissions = staffRolePermissions(user.staffRole || "staff");
  }
  if (isPrivilegedRole(role)) {
    const last = Number(session.lastPrivilegedActivityAt || session.savedAt || 0);
    if (!last || Date.now() - last >= STAFF_IDLE_LIMIT_MS) {
      safeStorageRemove(APP_KEYS.session);
      return false;
    }
    lastPrivilegedActivityAt = last;
  } else {
    lastPrivilegedActivityAt = 0;
  }
  state.user = user;
  state.role = role;
  state.tab = String(session.tab || (role === "customer" ? "trackApplication" : "dashboard"));
  if (session.lang === "en" || session.lang === "ur") state.lang = session.lang;
  return true;
}

function supabaseClient() {
  return window.appSupabase?.getClient?.() || null;
}

function hasSupabaseClient() {
  return !!supabaseClient();
}

function browserOnline() {
  return typeof navigator === "undefined" || navigator.onLine !== false;
}

function cachedList(key) {
  const list = safeStorageGet(key, []);
  return Array.isArray(list) ? list : [];
}

function cacheList(key, value) {
  safeStorageSet(key, Array.isArray(value) ? value : []);
}

function queueApplicantsSync(applicantsList) {
  if (applicantsSyncTimeout) clearTimeout(applicantsSyncTimeout);
  applicantsSyncTimeout = setTimeout(() => {
    saveApplicantsToServer(applicantsList).catch(() => {});
  }, 400);
}

function cleanDateInput(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function todayDateInput() {
  return new Date().toISOString().slice(0, 10);
}

function mergeCustomerCacheRecord(onlineItem, cachedItem) {
  if (!cachedItem || typeof cachedItem !== "object") return onlineItem;
  return {
    ...cachedItem,
    ...onlineItem,
    documents: cachedItem.documents || onlineItem.documents || {},
    linkedDocumentIds: toArray(cachedItem.linkedDocumentIds).length ? toArray(cachedItem.linkedDocumentIds) : toArray(onlineItem.linkedDocumentIds),
    linkedPaymentIds: toArray(cachedItem.linkedPaymentIds).length ? toArray(cachedItem.linkedPaymentIds) : toArray(onlineItem.linkedPaymentIds),
  };
}

function normalizeCompanyRecord(row = {}) {
  return {
    id: row.id || "",
    name: String(row.name || "").trim(),
    phone: String(row.phone || "").trim(),
    address: String(row.address || "").trim(),
    description: String(row.description || "").trim(),
    created_at: row.created_at || "",
  };
}

function normalizeAgentRecord(row = {}, index = 0) {
  return {
    id: row.id || "",
    agent_code: String(row.agent_code || row.agentCode || "").trim() || String(index + 1).padStart(4, "0"),
    name: String(row.name || "").trim(),
    email: String(row.email || "").trim(),
    phone: String(row.phone || "").trim(),
    role: String(row.role || "agent").trim() || "agent",
    created_at: row.created_at || "",
  };
}

function mergeCompanyProfilesWithRemote(remoteCompanies) {
  const remoteList = Array.isArray(remoteCompanies) ? remoteCompanies : [];
  const remoteByName = new Map(remoteList.map((item) => [String(item.name || "").trim().toLowerCase(), item]));
  const aliases = {
    travel: ["travel nama"],
    umeed: ["umeed e rozgar"],
    group296: ["296 group", "296 group (admin internal)"],
  };
  const merged = companyProfiles().map((profile) => {
    const fallbackName = String(profile.name || "").trim().toLowerCase();
    const matchNames = [fallbackName, ...(aliases[profile.key] || [])];
    const remote = matchNames.map((name) => remoteByName.get(name)).find(Boolean);
    if (!remote) return profile;
    return {
      ...profile,
      remoteId: remote.id || profile.remoteId || "",
      name: remote.name || profile.name,
      phone: remote.phone || profile.phone,
      description: remote.description || profile.description,
    };
  });
  runtimeStore[APP_KEYS.companyProfiles] = cloneValue(merged);
  safeStorageSet(APP_KEYS.companyProfiles, merged);
  return merged;
}

async function fetchSupabaseCompanies() {
  const client = supabaseClient();
  if (!client || !browserOnline()) return cachedList(APP_KEYS.companiesCache);
  const { data, error } = await client
    .from("companies")
    .select("id, name, phone, address, description, created_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  const companies = Array.isArray(data) ? data.map(normalizeCompanyRecord).filter((item) => item.name) : [];
  cacheList(APP_KEYS.companiesCache, companies);
  return companies;
}

async function ensureSupabaseCompany(companyLike = {}) {
  const name = String(companyLike.name || "").trim();
  if (!name) return null;
  const client = supabaseClient();
  if (!client || !browserOnline()) return null;
  const payload = {
    name,
    phone: String(companyLike.phone || "").trim() || null,
    address: String(companyLike.address || "").trim() || null,
    description: String(companyLike.description || "").trim() || null,
  };
  const { data, error } = await client
    .from("companies")
    .upsert(payload, { onConflict: "name" })
    .select("id, name, phone, address, description, created_at")
    .single();
  if (error) throw error;
  return normalizeCompanyRecord(data || payload);
}

async function saveCompaniesToSupabase(companyProfilesList) {
  const profiles = Array.isArray(companyProfilesList) ? companyProfilesList : [];
  const companyRows = profiles.map((company) => ({
    id: company.remoteId || company.id || undefined,
    name: String(company.name || "").trim(),
    phone: String(company.phone || "").trim(),
    address: String(company.address || "").trim(),
    description: String(company.description || "").trim(),
  })).filter((company) => company.name);

  cacheList(APP_KEYS.companiesCache, companyRows);
  if (!hasSupabaseClient() || !browserOnline()) {
    safeStorageSet(APP_KEYS.pendingCompanies, companyRows);
    return { status: "local", companies: companyRows };
  }

  const savedCompanies = [];
  try {
    for (const company of companyRows) {
      const saved = await ensureSupabaseCompany(company);
      if (saved) savedCompanies.push(saved);
    }
    cacheList(APP_KEYS.companiesCache, savedCompanies);
    safeStorageRemove(APP_KEYS.pendingCompanies);
    runtimeStore.crmCompanies = cloneValue(savedCompanies);
    mergeCompanyProfilesWithRemote(savedCompanies);
    return { status: "online", companies: savedCompanies };
  } catch (error) {
    safeStorageSet(APP_KEYS.pendingCompanies, companyRows);
    return { status: "local", companies: companyRows, error };
  }
}

async function findCountryIdByName(name) {
  const normalized = String(name || "").trim();
  if (!normalized) return null;
  const cache = runtimeStore.crmCountryIdCache instanceof Map ? runtimeStore.crmCountryIdCache : new Map();
  if (cache.has(normalized.toLowerCase())) return cache.get(normalized.toLowerCase());
  const client = supabaseClient();
  if (!client || !browserOnline()) return null;
  try {
    const { data, error } = await client
      .from("countries")
      .select("id, name")
      .ilike("name", normalized)
      .limit(1)
      .maybeSingle();
    if (error) return null;
    const id = data?.id || null;
    cache.set(normalized.toLowerCase(), id);
    runtimeStore.crmCountryIdCache = cache;
    return id;
  } catch {
    return null;
  }
}

async function upsertSupabaseApplicantRecord(applicant) {
  const client = supabaseClient();
  if (!client) throw new Error("Supabase is not configured.");

  const current = { ...applicant };
  let candidateId = String(current.remoteCandidateId || "").trim();
  let applicationRowId = String(current.remoteApplicationId || "").trim();

  if (current.appId && (!candidateId || !applicationRowId)) {
    const { data: existingApp } = await client
      .from("applications")
      .select("id, candidate_id")
      .eq("application_id", current.appId)
      .maybeSingle();
    if (existingApp) {
      applicationRowId = existingApp.id || applicationRowId;
      candidateId = existingApp.candidate_id || candidateId;
    }
  }

  const companyName = String(current.companyName || current.serviceCompany || "").trim();
  const companyRecord = companyName ? await ensureSupabaseCompany({ name: companyName }) : null;
  const countryId = await findCountryIdByName(current.country || "");
  const candidatePayload = {
    ...(candidateId ? { id: candidateId } : {}),
    name: String(current.name || "Customer").trim() || "Customer",
    father_name: String(current.fatherName || "").trim() || null,
    passport_number: String(current.passport || current.passportNumber || "").trim() || null,
    phone: String(current.contact || current.phone || "").trim() || null,
    email: String(current.email || "").trim() || null,
    country_preference: countryId,
    job_category: String(current.tradeCategory || current.jobCategory || "").trim() || null,
    agent_id: String(current.agentId || "").trim() || null,
    status: String(current.status || "New Lead").trim() || "New Lead",
  };

  let candidateResponse;
  if (candidatePayload.id) {
    const { data, error } = await client
      .from("candidates")
      .upsert(candidatePayload, { onConflict: "id" })
      .select("id, name, father_name, passport_number, phone, email, job_category, agent_id, status, created_at")
      .single();
    if (error) throw error;
    candidateResponse = data;
  } else {
    const { data, error } = await client
      .from("candidates")
      .insert(candidatePayload)
      .select("id, name, father_name, passport_number, phone, email, job_category, agent_id, status, created_at")
      .single();
    if (error) throw error;
    candidateResponse = data;
  }

  const applicationPayload = {
    ...(applicationRowId ? { id: applicationRowId } : {}),
    application_id: String(current.appId || "").trim() || createApplicationId(companyName || "296 Group", new Date()),
    candidate_id: candidateResponse.id,
    company_id: companyRecord?.id || null,
    stage: String(current.stage || "Application").trim() || "Application",
    status: String(current.status || candidateResponse.status || "Applied").trim() || "Applied",
    application_date: cleanDateInput(current.applyDate || current.createdAt) || todayDateInput(),
    travel_date: cleanDateInput(current.travelDate),
    total_payment: toNumber(current.totalPayment),
    advance_payment: toNumber(current.advancePayment),
    refund_payment: toNumber(current.refundPayment),
    remaining_payment: calculateRemaining(current.totalPayment, current.advancePayment, current.refundPayment),
  };

  let applicationResponse;
  if (applicationPayload.id) {
    const { data, error } = await client
      .from("applications")
      .upsert(applicationPayload, { onConflict: "id" })
      .select("id, application_id, stage, status, application_date, travel_date, total_payment, advance_payment, refund_payment, remaining_payment, created_at")
      .single();
    if (error) throw error;
    applicationResponse = data;
  } else {
    const { data, error } = await client
      .from("applications")
      .insert(applicationPayload)
      .select("id, application_id, stage, status, application_date, travel_date, total_payment, advance_payment, refund_payment, remaining_payment, created_at")
      .single();
    if (error) throw error;
    applicationResponse = data;
  }

  return {
    ...current,
    appId: applicationResponse.application_id,
    remoteCandidateId: candidateResponse.id,
    remoteApplicationId: applicationResponse.id,
    name: candidateResponse.name || current.name || "",
    fatherName: candidateResponse.father_name || current.fatherName || "",
    passport: candidateResponse.passport_number || current.passport || "",
    contact: candidateResponse.phone || current.contact || "",
    email: candidateResponse.email || current.email || "",
    tradeCategory: candidateResponse.job_category || current.tradeCategory || "",
    agentId: candidateResponse.agent_id || current.agentId || "",
    status: applicationResponse.status || current.status || "",
    stage: applicationResponse.stage || current.stage || "",
    applyDate: applicationResponse.application_date || current.applyDate || "",
    travelDate: applicationResponse.travel_date || current.travelDate || "",
    totalPayment: Number(applicationResponse.total_payment || 0),
    advancePayment: Number(applicationResponse.advance_payment || 0),
    refundPayment: Number(applicationResponse.refund_payment || 0),
    remainingPayment: Number(applicationResponse.remaining_payment || 0),
    companyName: companyRecord?.name || companyName || current.companyName || "",
    serviceCompany: current.serviceCompany || companyRecord?.name || companyName || "",
    createdAt: applicationResponse.created_at || candidateResponse.created_at || current.createdAt || new Date().toISOString(),
  };
}

function mapSupabaseApplicationRow(row, index, cachedByAppId) {
  const candidate = row.candidates || {};
  const company = row.companies || {};
  const mapped = {
    remoteApplicationId: row.id || "",
    remoteCandidateId: candidate.id || "",
    serial: index + 1,
    appId: row.application_id || "",
    name: candidate.name || "",
    fatherName: candidate.father_name || "",
    passport: candidate.passport_number || "",
    contact: candidate.phone || "",
    phone: candidate.phone || "",
    email: candidate.email || "",
    tradeCategory: candidate.job_category || "",
    agentId: candidate.agent_id || "",
    status: row.status || candidate.status || "New Lead",
    stage: row.stage || "Application",
    applyDate: row.application_date || "",
    travelDate: row.travel_date || "",
    totalPayment: Number(row.total_payment || 0),
    advancePayment: Number(row.advance_payment || 0),
    refundPayment: Number(row.refund_payment || 0),
    remainingPayment: Number(row.remaining_payment || 0),
    companyName: company.name || "",
    serviceCompany: company.name || "",
    createdAt: row.created_at || candidate.created_at || "",
  };
  const cached = cachedByAppId.get(String(mapped.appId || "").toLowerCase());
  return mergeCustomerCacheRecord(mapped, cached);
}

async function fetchApplicantsFromServer() {
  const client = supabaseClient();
  const cached = cachedList(APP_KEYS.candidatesCache);
  if (!client || !browserOnline()) return cached;
  try {
    const { data: applicationRows, error: applicationError } = await client
      .from("applications")
      .select("id, application_id, candidate_id, company_id, stage, status, application_date, travel_date, total_payment, advance_payment, refund_payment, remaining_payment, created_at")
      .order("created_at", { ascending: false });
    if (applicationError) throw applicationError;

    const candidateIds = Array.from(new Set((applicationRows || []).map((row) => row.candidate_id).filter(Boolean)));
    const companyIds = Array.from(new Set((applicationRows || []).map((row) => row.company_id).filter(Boolean)));

    const { data: candidateRows, error: candidateError } = candidateIds.length
      ? await client
        .from("candidates")
        .select("id, name, father_name, passport_number, phone, email, job_category, agent_id, status, created_at")
        .in("id", candidateIds)
      : { data: [], error: null };
    if (candidateError) throw candidateError;

    const { data: companyRows, error: companyError } = companyIds.length
      ? await client
        .from("companies")
        .select("id, name, phone, description")
        .in("id", companyIds)
      : { data: [], error: null };
    if (companyError) throw companyError;

    const candidateMap = new Map((candidateRows || []).map((row) => [row.id, row]));
    const companyMap = new Map((companyRows || []).map((row) => [row.id, row]));
    const cacheMap = new Map(cached.map((item) => [String(item.appId || "").toLowerCase(), item]));
    const applicants = Array.isArray(applicationRows)
      ? applicationRows.map((row, index) => mapSupabaseApplicationRow({
        ...row,
        candidates: candidateMap.get(row.candidate_id) || {},
        companies: companyMap.get(row.company_id) || {},
      }, index, cacheMap))
      : [];
    cacheList(APP_KEYS.candidatesCache, applicants);
    return applicants;
  } catch {
    return cached;
  }
}

async function saveApplicantsToServer(applicantsList) {
  const applicants = Array.isArray(applicantsList) ? applicantsList : [];
  cacheList(APP_KEYS.candidatesCache, applicants);
  if (!hasSupabaseClient() || !browserOnline()) {
    safeStorageSet(APP_KEYS.pendingCandidates, applicants);
    return { status: "local", applicants };
  }
  try {
    const synced = [];
    for (const applicant of applicants) {
      synced.push(await upsertSupabaseApplicantRecord(applicant));
    }
    synced.forEach((item, index) => {
      item.serial = index + 1;
    });
    runtimeStore[APP_KEYS.customers] = cloneValue(synced);
    cacheList(APP_KEYS.candidatesCache, synced);
    safeStorageRemove(APP_KEYS.pendingCandidates);
    return { status: "online", applicants: synced };
  } catch (error) {
    safeStorageSet(APP_KEYS.pendingCandidates, applicants);
    return { status: "local", applicants, error };
  }
}

function queuePendingApplicantDelete(applicationId) {
  const pending = cachedList(APP_KEYS.pendingCandidateDeletes);
  const next = Array.from(new Set([...pending, String(applicationId || "").trim()].filter(Boolean)));
  safeStorageSet(APP_KEYS.pendingCandidateDeletes, next);
}

async function deleteApplicantFromSupabase(applicant) {
  const applicationId = String(applicant?.appId || "").trim();
  if (!applicationId) return { status: "local" };
  if (!hasSupabaseClient() || !browserOnline()) {
    queuePendingApplicantDelete(applicationId);
    return { status: "local" };
  }
  try {
    const client = supabaseClient();
    const { data: existing, error: lookupError } = await client
      .from("applications")
      .select("id, candidate_id")
      .eq("application_id", applicationId)
      .maybeSingle();
    if (lookupError) throw lookupError;
    if (existing?.id) {
      const { error: deleteAppError } = await client
        .from("applications")
        .delete()
        .eq("id", existing.id);
      if (deleteAppError) throw deleteAppError;

      if (existing.candidate_id) {
        const { count, error: countError } = await client
          .from("applications")
          .select("id", { count: "exact", head: true })
          .eq("candidate_id", existing.candidate_id);
        if (countError) throw countError;
        if (!count) {
          const { error: deleteCandidateError } = await client
            .from("candidates")
            .delete()
            .eq("id", existing.candidate_id);
          if (deleteCandidateError) throw deleteCandidateError;
        }
      }
    }
    const pending = cachedList(APP_KEYS.pendingCandidateDeletes).filter((item) => item !== applicationId);
    if (pending.length) safeStorageSet(APP_KEYS.pendingCandidateDeletes, pending);
    else safeStorageRemove(APP_KEYS.pendingCandidateDeletes);
    return { status: "online" };
  } catch (error) {
    queuePendingApplicantDelete(applicationId);
    return { status: "local", error };
  }
}

function appRoleHeader() {
  if (!state.user) return "admin";
  if (state.user.role === "admin") return "admin";
  if (state.user.role === "staff") {
    const staffRole = String(state.user.staffRole || "staff").toLowerCase();
    if (staffRole === "agent" || staffRole === "sub_agent") return staffRole;
    return "staff";
  }
  return "customer";
}

async function crmFetch(path, init = {}) {
  const baseHeaders = {
    "x-app-role": appRoleHeader(),
    ...(init.body ? { "Content-Type": "application/json" } : {}),
    ...(init.headers || {}),
  };
  const run = async (target) => {
    const resp = await fetch(target, { ...init, headers: baseHeaders });
    const payload = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      throw new Error(payload.error || payload.details || `Request failed (${resp.status})`);
    }
    return payload;
  };

  try {
    return await run(path);
  } catch (error) {
    const rawMessage = String(error?.message || "");
    const isNetworkError =
      error instanceof TypeError ||
      /failed to fetch|networkerror|load failed/i.test(rawMessage);
    if (!isNetworkError || !String(path || "").startsWith("/")) {
      throw error;
    }

    const configuredBase = String(settings()?.apiBaseUrl || "").trim().replace(/\/+$/, "");
    const origin = String(window.location?.origin || "").trim();
    const fallbackTargets = [];
    if (configuredBase) fallbackTargets.push(`${configuredBase}${path}`);
    if (origin && origin !== "null") fallbackTargets.push(`${origin}${path}`);

    for (const target of Array.from(new Set(fallbackTargets))) {
      if (!target || target === path) continue;
      try {
        return await run(target);
      } catch {
        // Try the next fallback target.
      }
    }
    throw error;
  }
}

async function fetchDashboardMetrics() {
  try {
    const payload = await crmFetch("/crm-dashboard");
    return payload.metrics || null;
  } catch {
    return null;
  }
}

async function fetchCrmReferences() {
  try {
    const companies = await fetchSupabaseCompanies();
    return {
      countries: ALL_COUNTRIES,
      companies,
    };
  } catch {
    return {
      countries: ALL_COUNTRIES,
      companies: cachedList(APP_KEYS.companiesCache),
    };
  }
}

async function fetchCrmAgents() {
  const client = supabaseClient();
  const cached = cachedList(APP_KEYS.agentsCache);
  if (!client || !browserOnline()) return cached;
  try {
    const { data, error } = await client
      .from("agents")
      .select("id, name, email, phone, role, created_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    const agents = Array.isArray(data) ? data.map((item, index) => normalizeAgentRecord(item, index)).filter((item) => item.name) : [];
    cacheList(APP_KEYS.agentsCache, agents);
    return agents;
  } catch {
    return cached;
  }
}

function mergeAgentIntoRuntime(agent) {
  const list = Array.isArray(runtimeStore.crmAgents) ? [...runtimeStore.crmAgents] : [];
  const idx = list.findIndex((item) => String(item.id || "") === String(agent.id || ""));
  if (idx >= 0) list[idx] = { ...list[idx], ...agent };
  else list.unshift(agent);
  const normalized = list.map((item, index) => normalizeAgentRecord(item, index));
  runtimeStore.crmAgents = normalized;
  cacheList(APP_KEYS.agentsCache, normalized);
  return normalized;
}

function queuePendingAgent(agent) {
  const pending = cachedList(APP_KEYS.pendingAgents);
  const matchIndex = pending.findIndex((item) =>
    (agent.id && String(item.id || "") === String(agent.id || ""))
    || (agent.email && String(item.email || "").toLowerCase() === String(agent.email || "").toLowerCase())
  );
  if (matchIndex >= 0) pending[matchIndex] = { ...pending[matchIndex], ...agent };
  else pending.unshift(agent);
  safeStorageSet(APP_KEYS.pendingAgents, pending);
}

async function saveAgentToSupabase(agentInput) {
  const agent = {
    id: String(agentInput.id || "").trim(),
    name: String(agentInput.name || "").trim(),
    email: String(agentInput.email || "").trim(),
    phone: String(agentInput.phone || "").trim(),
    role: String(agentInput.role || "agent").trim() || "agent",
    agent_code: String(agentInput.agentCode || agentInput.agent_code || "").trim() || localAgentCode(),
  };
  if (!agent.name) {
    return { status: "local", agent, error: new Error("Agent name is required.") };
  }

  mergeAgentIntoRuntime(agent);
  if (!hasSupabaseClient() || !browserOnline()) {
    queuePendingAgent(agent);
    return { status: "local", agent };
  }

  try {
    const payload = {
      ...(agent.id && !String(agent.id).startsWith("local_") ? { id: agent.id } : {}),
      name: agent.name,
      email: agent.email || null,
      phone: agent.phone || null,
      role: agent.role || "agent",
    };

    let queryResult;
    if (payload.id) {
      queryResult = await supabaseClient()
        .from("agents")
        .upsert(payload, { onConflict: "id" })
        .select("id, name, email, phone, role, created_at")
        .single();
    } else if (payload.email) {
      queryResult = await supabaseClient()
        .from("agents")
        .upsert(payload, { onConflict: "email" })
        .select("id, name, email, phone, role, created_at")
        .single();
    } else {
      queryResult = await supabaseClient()
        .from("agents")
        .insert(payload)
        .select("id, name, email, phone, role, created_at")
        .single();
    }

    if (queryResult.error) throw queryResult.error;
    const saved = normalizeAgentRecord({ ...queryResult.data, agent_code: agent.agent_code }, 0);
    mergeAgentIntoRuntime(saved);
    const pending = cachedList(APP_KEYS.pendingAgents).filter((item) =>
      !(
        (saved.id && String(item.id || "") === String(saved.id || ""))
        || (saved.email && String(item.email || "").toLowerCase() === String(saved.email || "").toLowerCase())
        || (agent.email && String(item.email || "").toLowerCase() === String(agent.email || "").toLowerCase())
      )
    );
    if (pending.length) safeStorageSet(APP_KEYS.pendingAgents, pending);
    else safeStorageRemove(APP_KEYS.pendingAgents);
    return { status: "online", agent: saved };
  } catch (error) {
    queuePendingAgent(agent);
    return { status: "local", agent, error };
  }
}

async function syncPendingSupabaseData() {
  if (pendingSupabaseSyncPromise) return pendingSupabaseSyncPromise;
  pendingSupabaseSyncPromise = (async () => {
    if (!hasSupabaseClient() || !browserOnline()) return false;

    const pendingDeletes = cachedList(APP_KEYS.pendingCandidateDeletes);
    for (const applicationId of pendingDeletes) {
      await deleteApplicantFromSupabase({ appId: applicationId });
    }

    const pendingCompanies = cachedList(APP_KEYS.pendingCompanies);
    if (pendingCompanies.length) {
      await saveCompaniesToSupabase(
        pendingCompanies.map((item, index) => ({
          key: item.key || `company_${index + 1}`,
          remoteId: item.id || "",
          name: item.name || "",
          phone: item.phone || "",
          address: item.address || "",
          description: item.description || "",
          services: [],
        }))
      );
    }

    const pendingAgents = cachedList(APP_KEYS.pendingAgents);
    for (const agent of pendingAgents) {
      await saveAgentToSupabase(agent);
    }

    const pendingCandidates = cachedList(APP_KEYS.pendingCandidates);
    if (pendingCandidates.length) {
      await saveApplicantsToServer(pendingCandidates);
    }

    return true;
  })();

  try {
    return await pendingSupabaseSyncPromise;
  } finally {
    pendingSupabaseSyncPromise = null;
  }
}

async function fetchCrmJobs() {
  try {
    const payload = await crmFetch("/crm-jobs");
    return Array.isArray(payload.jobs) ? payload.jobs : [];
  } catch {
    return [];
  }
}

async function fetchCrmDocuments() {
  try {
    const payload = await crmFetch("/crm-documents");
    return Array.isArray(payload.documents) ? payload.documents : [];
  } catch {
    return [];
  }
}

async function fetchCrmPayments() {
  try {
    const payload = await crmFetch("/crm-payments");
    return Array.isArray(payload.payments) ? payload.payments : [];
  } catch {
    return [];
  }
}

async function fetchCrmReports() {
  try {
    const payload = await crmFetch("/crm-reports");
    return payload.reports || null;
  } catch {
    return null;
  }
}

function load(key, fallback) {
  if (Object.prototype.hasOwnProperty.call(runtimeStore, key)) {
    return cloneValue(runtimeStore[key]);
  }
  return safeStorageGet(key, fallback);
}

function save(key, value) {
  runtimeStore[key] = cloneValue(value);
  safeStorageSet(key, value);
  if (key === APP_KEYS.customers) {
    cacheList(APP_KEYS.candidatesCache, Array.isArray(value) ? value : []);
    queueApplicantsSync(Array.isArray(value) ? value : []);
  }
}

function settings() {
  return { ...defaultSettings, ...load(APP_KEYS.settings, {}) };
}

function customers() {
  return load(APP_KEYS.customers, []);
}

function notifications() {
  return load(APP_KEYS.notifications, []);
}

function staffMembers() {
  return load(APP_KEYS.staff, []);
}

function defaultServicesCatalog() {
  return [
    { name: "Ticket Price Search", company: "Travel Nama" },
    { name: "Hotel Booking", company: "Travel Nama" },
    { name: "Visit Visa", company: "Travel Nama" },
    { name: "Umrah Package", company: "Travel Nama" },
    { name: "Work Visa", company: "Umeed e Rozgar" },
    { name: "NAVTTC Appointment", company: "Umeed e Rozgar" },
    { name: "GAMCA/Wafid Medical", company: "Umeed e Rozgar" },
    { name: "Pak Soft Skill Certificate", company: "Umeed e Rozgar" },
    { name: "Online E-Protector", company: "Umeed e Rozgar" },
    { name: "Thasheer Appointment", company: "Umeed e Rozgar" },
  ];
}

function servicesCatalog() {
  const list = load(APP_KEYS.services, null);
  if (Array.isArray(list) && list.length) return list;
  return defaultServicesCatalog();
}

function saveServicesCatalog(list) {
  const clean = list
    .map((s) => ({ name: String(s.name || "").trim(), company: String(s.company || "").trim() }))
    .filter((s) => s.name);
  save(APP_KEYS.services, clean);
}

function defaultCompanyProfiles() {
  return companyData.map((c) => ({
    key: c.key,
    name: c.name,
    phone: c.phone,
    description: c.description,
    image: c.image || "",
    services: Array.isArray(c.services) ? c.services.map((s) => ({ name: s.name, photo: s.photo || "", details: s.details || "" })) : [],
  }));
}

function companyProfiles() {
  const list = load(APP_KEYS.companyProfiles, null);
  if (Array.isArray(list) && list.length) return list;
  return defaultCompanyProfiles();
}

function saveCompanyProfiles(list) {
  const clean = list.map((c) => ({
    key: c.key,
    name: String(c.name || "").trim(),
    phone: String(c.phone || "").trim(),
    description: String(c.description || "").trim(),
    image: String(c.image || "").trim(),
    services: Array.isArray(c.services) ? c.services.map((s) => ({
      name: String(s.name || "").trim(),
      photo: String(s.photo || "").trim(),
      details: String(s.details || "").trim(),
    })).filter((s) => s.name) : [],
  }));
  save(APP_KEYS.companyProfiles, clean);
}

function appSnapshot() {
  const analytics = buildAnalytics();
  return {
    exportedAt: new Date().toISOString(),
    customers: customers(),
    settings: settings(),
    notifications: notifications(),
    customTrades: customTrades(),
    staff: staffMembers(),
    services: servicesCatalog(),
    companyProfiles: companyProfiles(),
    socialLinks: socialLinks(),
    charts: analytics,
  };
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text || ""));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function deriveAesKey(passphrase, saltBytes) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBytes, iterations: 120000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function bytesToB64(bytes) {
  let bin = "";
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

async function encryptText(passphrase, plainText) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(passphrase, salt);
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plainText)
  );
  return JSON.stringify({
    v: 1,
    alg: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    i: 120000,
    salt: bytesToB64(salt),
    iv: bytesToB64(iv),
    data: bytesToB64(new Uint8Array(cipher)),
  });
}

async function decryptText(passphrase, envelopeText) {
  const env = JSON.parse(envelopeText);
  const salt = b64ToBytes(env.salt);
  const iv = b64ToBytes(env.iv);
  const cipher = b64ToBytes(env.data);
  const key = await deriveAesKey(passphrase, salt);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
  return new TextDecoder().decode(plain);
}

function socialLinks() {
  return load(APP_KEYS.socialLinks, []);
}

function saveSocialLinks(list) {
  const clean = list
    .map((x) => ({
      id: String(x.id || `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`),
      companyKey: String(x.companyKey || "all").trim(),
      platform: String(x.platform || "").trim(),
      label: String(x.label || "").trim(),
      url: String(x.url || "").trim(),
    }))
    .filter((x) => x.platform && x.url);
  save(APP_KEYS.socialLinks, clean);
}

function googleClientId() {
  return String(settings().googleClientId || "").trim();
}

function driveFolderName() {
  return String(settings().driveFolderName || "296 Group App Data").trim() || "296 Group App Data";
}

function isDriveConnected() {
  return Boolean(driveState.accessToken);
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Script failed: ${src}`)), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error(`Script failed: ${src}`));
    document.head.appendChild(s);
  });
}

async function ensureGoogleIdentityLoaded() {
  if (window.google?.accounts?.oauth2) return;
  if (!driveState.loadingPromise) {
    driveState.loadingPromise = loadScriptOnce("https://accounts.google.com/gsi/client");
  }
  await driveState.loadingPromise;
}

async function connectGoogleDrive(interactive = true) {
  const clientId = googleClientId();
  if (!clientId) throw new Error("Google Client ID is required in Admin Settings.");
  await ensureGoogleIdentityLoaded();
  return new Promise((resolve, reject) => {
    driveState.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly",
      callback: (resp) => {
        if (resp?.error) {
          reject(new Error(resp.error));
          return;
        }
        driveState.accessToken = resp.access_token || "";
        resolve(driveState.accessToken);
      },
    });
    driveState.tokenClient.requestAccessToken({ prompt: interactive ? "consent" : "" });
  });
}

function disconnectGoogleDrive() {
  driveState.accessToken = "";
  driveState.folderId = "";
  driveState.docsFolderId = "";
}

async function driveFetch(url, init = {}) {
  if (!driveState.accessToken) throw new Error("Google Drive is not connected.");
  const headers = {
    Authorization: `Bearer ${driveState.accessToken}`,
    ...(init.headers || {}),
  };
  const resp = await fetch(url, { ...init, headers });
  if (resp.status === 401) throw new Error("Google session expired. Please reconnect Drive.");
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Drive API error (${resp.status}): ${text.slice(0, 200)}`);
  }
  return resp;
}

async function findDriveFolderIdByName(name, parentId = null) {
  const safe = name.replace(/'/g, "\\'");
  const parentClause = parentId ? ` and '${parentId}' in parents` : "";
  const q = `name='${safe}' and mimeType='application/vnd.google-apps.folder' and trashed=false${parentClause}`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&pageSize=1&spaces=drive`;
  const resp = await driveFetch(url);
  const data = await resp.json();
  return data.files?.[0]?.id || "";
}

async function createDriveFolder(name, parentId = null) {
  const meta = {
    name,
    mimeType: "application/vnd.google-apps.folder",
    ...(parentId ? { parents: [parentId] } : {}),
  };
  const resp = await driveFetch("https://www.googleapis.com/drive/v3/files?fields=id,name", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meta),
  });
  const data = await resp.json();
  return data.id;
}

async function ensureDriveFolders() {
  if (driveState.folderId && driveState.docsFolderId) return;
  const rootName = driveFolderName();
  let rootId = await findDriveFolderIdByName(rootName);
  if (!rootId) rootId = await createDriveFolder(rootName);
  driveState.folderId = rootId;
  let docsId = await findDriveFolderIdByName("Documents", rootId);
  if (!docsId) docsId = await createDriveFolder("Documents", rootId);
  driveState.docsFolderId = docsId;
}

async function findDriveFileIdByName(fileName, parentId) {
  const safe = fileName.replace(/'/g, "\\'");
  const q = `name='${safe}' and trashed=false and '${parentId}' in parents`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)&pageSize=1&spaces=drive`;
  const resp = await driveFetch(url);
  const data = await resp.json();
  return data.files?.[0]?.id || "";
}

async function uploadFileMultipart({ name, mimeType, contentBlob, parentId, existingFileId = "" }) {
  const metadata = {
    name,
    ...(parentId ? { parents: [parentId] } : {}),
  };
  const boundary = `-------314159265358979323846_${Date.now()}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;

  const metaPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}`;
  const fileHeader = `${delimiter}Content-Type: ${mimeType || "application/octet-stream"}\r\n\r\n`;
  const endPart = closeDelim;
  const body = new Blob([metaPart, fileHeader, contentBlob, endPart], { type: `multipart/related; boundary=${boundary}` });

  const method = existingFileId ? "PATCH" : "POST";
  const idPath = existingFileId ? `/${existingFileId}` : "";
  const url = `https://www.googleapis.com/upload/drive/v3/files${idPath}?uploadType=multipart&fields=id,name,webViewLink,webContentLink,mimeType,size`;
  const resp = await driveFetch(url, {
    method,
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  return resp.json();
}

async function uploadDocumentFile(file, customerName = "customer") {
  await ensureDriveFolders();
  const safeName = String(customerName || "customer").replace(/[^a-zA-Z0-9_-]+/g, "_");
  const fileName = `${safeName}_${Date.now()}_${file.name}`;
  const data = await uploadFileMultipart({
    name: fileName,
    mimeType: file.type || "application/octet-stream",
    contentBlob: file,
    parentId: driveState.docsFolderId,
  });
  return {
    name: data.name || file.name,
    type: data.mimeType || file.type,
    size: Number(data.size || file.size || 0),
    driveFileId: data.id || "",
    driveLink: data.webViewLink || data.webContentLink || "",
  };
}

async function backupAllToGoogleDrive() {
  if (!isDriveConnected()) throw new Error("Connect Google Drive first.");
  await ensureDriveFolders();
  const passphrase = settings().adminPassword || defaultSettings.adminPassword;
  const payload = appSnapshot();
  payload.passwordHash = await sha256Hex(passphrase);
  const encrypted = await encryptText(passphrase, JSON.stringify(payload));
  const blob = new Blob([encrypted], { type: "application/json" });
  const fileName = "app296_secure_backup.enc.json";
  const existing = await findDriveFileIdByName(fileName, driveState.folderId);
  await uploadFileMultipart({
    name: fileName,
    mimeType: "application/json",
    contentBlob: blob,
    parentId: driveState.folderId,
    existingFileId: existing,
  });
}

async function restoreAllFromGoogleDrive() {
  if (!isDriveConnected()) throw new Error("Connect Google Drive first.");
  await ensureDriveFolders();
  const fileName = "app296_secure_backup.enc.json";
  const id = await findDriveFileIdByName(fileName, driveState.folderId);
  if (!id) throw new Error("No backup file found in Google Drive.");
  const resp = await driveFetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
  const encryptedText = await resp.text();
  const passphrase = settings().adminPassword || defaultSettings.adminPassword;
  const plain = await decryptText(passphrase, encryptedText);
  const data = JSON.parse(plain);

  save(APP_KEYS.customers, Array.isArray(data.customers) ? data.customers : []);
  save(APP_KEYS.settings, { ...defaultSettings, ...(data.settings || {}) });
  save(APP_KEYS.notifications, Array.isArray(data.notifications) ? data.notifications : []);
  save(APP_KEYS.customTrades, Array.isArray(data.customTrades) ? data.customTrades : []);
  save(APP_KEYS.staff, Array.isArray(data.staff) ? data.staff : []);
  save(APP_KEYS.services, Array.isArray(data.services) ? data.services : []);
  save(APP_KEYS.companyProfiles, Array.isArray(data.companyProfiles) ? data.companyProfiles : defaultCompanyProfiles());
  save(APP_KEYS.socialLinks, Array.isArray(data.socialLinks) ? data.socialLinks : []);
}

async function autoDriveBackupIfEnabled() {
  const cfg = settings();
  if (!cfg.autoDriveSync || !isDriveConnected()) return;
  try {
    await backupAllToGoogleDrive();
  } catch {
    // Silent auto-sync failure to avoid interrupting workflow.
  }
}

function canUseServerFunctions() {
  return window.location.protocol.startsWith("http");
}

async function ensureServerDriveFolder(applicationId) {
  if (!canUseServerFunctions()) return null;
  try {
    const resp = await fetch("/ /create-application-drive-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data?.driveFolderUrl || null;
  } catch {
    return null;
  }
}

async function uploadDocumentsViaServer(applicationId, form) {
  if (!canUseServerFunctions()) return null;
  const fd = new FormData();
  fd.append("applicationId", applicationId);
  const docFields = ["passportCopy", "idCopy", "medicalReport", "ticketCopy", "otherDocs"];
  let hasFile = false;
  docFields.forEach((field) => {
    const files = form.querySelector(`[name="${field}"]`)?.files || [];
    Array.from(files).forEach((file) => {
      hasFile = true;
      fd.append(field, file, file.name);
    });
  });
  if (!hasFile) return {};

  try {
    const resp = await fetch("/ /upload-application-documents", {
      method: "POST",
      body: fd,
    });
    if (!resp.ok) return null;
    const payload = await resp.json();
    const docs = {};
    (payload.files || []).forEach((f) => {
      if (f.status !== "uploaded") return;
      const item = {
        name: f.fileName,
        driveFileId: f.driveFileId || "",
        driveLink: f.driveFileUrl || "",
      };
      if (f.fieldName === "otherDocs") {
        if (!Array.isArray(docs.otherDocs)) docs.otherDocs = [];
        docs.otherDocs.push(item);
      } else {
        docs[f.fieldName] = item;
      }
    });
    return docs;
  } catch {
    return null;
  }
}

function syncServicesCatalogFromProfiles(profiles) {
  const list = [];
  profiles.forEach((c) => {
    (c.services || []).forEach((s) => list.push({ name: s.name, company: c.name }));
  });
  saveServicesCatalog(list);
}

function staffRolePermissions(role) {
  const r = String(role || "").toLowerCase();
  const map = {
    admin: {
      canReports: true,
      canEdit: true,
      canDelete: true,
      canFinancialEdit: true,
      canManageAgents: true,
      canManageJobs: true,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: true,
      canSubmitCandidatesOnly: false,
    },
    manager: {
      canReports: true,
      canEdit: true,
      canDelete: true,
      canFinancialEdit: true,
      canManageAgents: true,
      canManageJobs: true,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: true,
      canSubmitCandidatesOnly: false,
    },
    counselor: {
      canReports: false,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: false,
      canSubmitCandidatesOnly: false,
    },
    operations: {
      canReports: true,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: true,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: false,
      canSubmitCandidatesOnly: false,
    },
    accounts: {
      canReports: true,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: true,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: false,
      canManageCandidates: false,
      canManageDocuments: false,
      canManagePayments: true,
      canSubmitCandidatesOnly: false,
    },
    data_entry: {
      canReports: false,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: false,
      canSubmitCandidatesOnly: false,
    },
    staff: {
      canReports: false,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: true,
      canManageCandidates: true,
      canManageDocuments: true,
      canManagePayments: false,
      canSubmitCandidatesOnly: false,
    },
    agent: {
      canReports: false,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: false,
      canManageCandidates: true,
      canManageDocuments: false,
      canManagePayments: false,
      canSubmitCandidatesOnly: true,
    },
    sub_agent: {
      canReports: false,
      canEdit: true,
      canDelete: false,
      canFinancialEdit: false,
      canManageAgents: false,
      canManageJobs: false,
      canManageApplications: false,
      canManageCandidates: true,
      canManageDocuments: false,
      canManagePayments: false,
      canSubmitCandidatesOnly: true,
    },
  };
  return map[r] || map.staff;
}

function idPrefixFromCompany(companyName) {
  const key = normalizeCompanyValue(companyName);
  if (key === "travel") return "TN";
  if (key === "umeed") return "UR";
  if (key === "group296") return "GP";
  return "AP";
}

function idDatePart(date) {
  const d = date instanceof Date ? date : new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  return `${day}${month}${year}`;
}

function nextIdSerial(prefix, datePart) {
  const list = customers();
  const pattern = new RegExp(`^${prefix}-${datePart}-(\\d{4})$`, "i");
  let max = 0;
  list.forEach((c) => {
    const id = String(c.appId || "");
    const match = id.match(pattern);
    if (match) max = Math.max(max, Number(match[1]));
  });
  return String(max + 1).padStart(4, "0");
}

function createApplicationId(companyName, createdAt = new Date()) {
  const prefix = idPrefixFromCompany(companyName);
  const datePart = idDatePart(createdAt);
  const serial = nextIdSerial(prefix, datePart);
  return `${prefix}-${datePart}-${serial}`;
}

function isEmailLoginValue(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function nameFromEmailAddress(email) {
  const raw = String(email || "").trim().split("@")[0] || "Customer";
  const clean = raw
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "Customer";
  return clean.replace(/\b\w/g, (m) => m.toUpperCase());
}

async function findOrCreateCustomerLoginRecord(query) {
  const value = String(query || "").trim();
  const lower = value.toLowerCase();
  const existing = customers().find((x) => {
    const byEmail = x.email && String(x.email).toLowerCase() === lower;
    const byAppId = x.appId && String(x.appId).toLowerCase() === lower;
    return byEmail || byAppId;
  });
  if (existing) return { customer: existing, created: false };
  if (!isEmailLoginValue(value)) return { customer: null, created: false };

  const now = new Date();
  const all = customers();
  const customer = {
    serial: all.length + 1,
    appId: createApplicationId("296 Group", now),
    name: nameFromEmailAddress(value),
    fatherName: "",
    passport: "",
    companyName: "296 Group",
    serviceCompany: "296 Group",
    country: "",
    visaType: "",
    contact: "",
    nominationContact: "",
    email: lower,
    tradeCategory: "",
    status: "New Lead",
    stage: "Application",
    applyDate: now.toISOString().slice(0, 10),
    travelDate: "",
    totalPayment: 0,
    advancePayment: 0,
    refundPayment: 0,
    remainingPayment: 0,
    requiredDocuments: "",
    documents: {},
    referenceType: "Guardian",
    reference: "",
    createdAt: now.toISOString(),
    serviceNotes: "Auto-created from customer email login.",
    boughtService: "",
    boughtServiceDetails: "",
  };

  all.push(customer);
  save(APP_KEYS.customers, all);
  const saveResult = await saveApplicantsToServer(all);
  const persistedCustomer = (saveResult.applicants || []).find((item) => item.appId === customer.appId) || customer;

  const note = notifications();
  note.unshift({
    at: now.toISOString(),
    text: `New customer email login created application: ${customer.email} (${customer.appId})`,
  });
  save(APP_KEYS.notifications, note);

  return { customer: persistedCustomer, created: true };
}

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function calculateRemaining(totalPayment, advancePayment, refundPayment) {
  return Math.max(0, toNumber(totalPayment) - toNumber(advancePayment) - toNumber(refundPayment));
}

function monthKey(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function recentMonths(count = 6) {
  const out = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return out;
}

function formatMonthLabel(key) {
  const [y, m] = key.split("-");
  return `${m}/${y.slice(2)}`;
}

function buildAnalytics() {
  const data = customers();
  const months = recentMonths(6);

  const monthlyApplications = months.map((m) => ({
    key: m,
    label: formatMonthLabel(m),
    value: data.filter((x) => monthKey(x.applyDate || x.createdAt) === m).length,
  }));

  const monthlySales = months.map((m) => ({
    key: m,
    label: formatMonthLabel(m),
    value: data
      .filter((x) => monthKey(x.applyDate || x.createdAt) === m)
      .reduce((s, x) => s + toNumber(x.totalPayment), 0),
  }));

  const companyBuckets = [
    { key: "travel", label: "Travel Nama" },
    { key: "umeed", label: "Umeed e Rozgar" },
    { key: "group296", label: "296 Group" },
  ];

  const companyProgress = companyBuckets.map((bucket) => {
    const list = data.filter((x) => normalizeCompanyValue(x.serviceCompany || x.companyName) === bucket.key);
    const completed = list.filter((x) => ["Completed", "Travelled", "Visa Approved"].includes(String(x.status || ""))).length;
    const percent = list.length ? Math.round((completed / list.length) * 100) : 0;
    const sales = list.reduce((s, x) => s + toNumber(x.totalPayment), 0);
    return { ...bucket, count: list.length, completed, percent, sales };
  });

  return { monthlyApplications, monthlySales, companyProgress };
}

function renderBarChart(title, rows, valueFormatter = (v) => String(v)) {
  const palette = ["#f2cf86", "#8fe388", "#7cc7ff", "#f8a66c", "#c9a3ff", "#ffd36a"];
  const max = Math.max(1, ...rows.map((r) => r.value));
  const bars = rows.map((r, idx) => {
    const h = Math.round((r.value / max) * 140);
    const color = palette[idx % palette.length];
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:56px;">
        <div style="font-size:11px;color:#d5d8d6">${valueFormatter(r.value)}</div>
        <div style="width:34px;height:${h}px;background:linear-gradient(180deg,${color},#365042);border-radius:8px 8px 4px 4px;border:1px solid rgba(255,255,255,.2)"></div>
        <div style="font-size:11px;color:#d5d8d6">${r.label}</div>
      </div>`;
  }).join("");
  return `
    <div class="kpi">
      <h3>${title}</h3>
      <div style="display:flex;align-items:flex-end;gap:10px;min-height:190px;overflow:auto;padding:8px 0;">${bars}</div>
    </div>`;
}

function renderLineChart(title, rows) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const width = 360;
  const height = 180;
  const stepX = rows.length > 1 ? width / (rows.length - 1) : width;
  const points = rows.map((r, i) => {
    const x = Math.round(i * stepX);
    const y = Math.round(height - (r.value / max) * 140 - 20);
    return { ...r, x, y };
  });
  const poly = points.map((p) => `${p.x},${p.y}`).join(" ");
  const marks = points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#7cc7ff" />`).join("");
  const labels = points.map((p) => `<text x="${p.x}" y="${height - 2}" font-size="10" fill="#d5d8d6" text-anchor="middle">${p.label}</text>`).join("");
  return `
    <div class="kpi">
      <h3>${title}</h3>
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="190" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="salesLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f2cf86" />
            <stop offset="50%" stop-color="#7cc7ff" />
            <stop offset="100%" stop-color="#8fe388" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#salesLineGrad)" stroke-width="3" points="${poly}" />
        ${marks}
        ${labels}
      </svg>
    </div>`;
}

function renderCompanyProgressChart(rows) {
  const cards = rows.map((r) => `
    <div class="kpi">
      <h3>${r.label}</h3>
      <p>Applications: ${r.count}</p>
      <p>Completed: ${r.completed} (${r.percent}%)</p>
      <p>Sales: PKR ${r.sales.toLocaleString()}</p>
      <div style="height:12px;background:rgba(255,255,255,.15);border-radius:999px;overflow:hidden;margin-top:8px;">
        <div style="height:100%;width:${r.percent}%;background:linear-gradient(90deg,#f2cf86,#b58745)"></div>
      </div>
    </div>`).join("");
  return `<div class="grid-3">${cards}</div>`;
}

function t(key) {
  return texts[state.lang][key] || key;
}

function applyLang() {
  document.getElementById("appTitle").textContent = t("title");
  document.getElementById("appSubtitle").textContent = t("subtitle");
  document.getElementById("loginTitle").textContent = t("signIn");
  document.getElementById("adminPassLabel").textContent = t("adminPass");
  document.getElementById("staffEmailLabel").textContent = t("staffEmail");
  document.getElementById("staffCodeLabel").textContent = t("staffCode");
  document.getElementById("customerEmailLabel").textContent = t("customerEmail");
  refs.roleSelect.options[0].textContent = t("roleAdmin");
  refs.roleSelect.options[1].textContent = t("roleStaff");
  refs.roleSelect.options[2].textContent = t("roleCustomer");
  refs.adminPassword.placeholder = t("adminPassPlaceholder");
  refs.staffEmail.placeholder = t("staffEmailPlaceholder");
  refs.staffCode.placeholder = t("staffCodePlaceholder");
  refs.customerEmail.placeholder = t("customerEmailPlaceholder");
  const loginBtnText = document.getElementById("loginBtnText");
  if (loginBtnText) loginBtnText.textContent = t("login");
  else refs.loginBtn.textContent = t("login");
  refs.logoutBtn.textContent = t("logout");
  refs.langToggle.textContent = state.lang === "en" ? t("langUrdu") : t("langEnglish");
  document.documentElement.lang = state.lang;
  document.body.style.direction = state.lang === "ur" ? "rtl" : "ltr";
}

function setRoleInputs() {
  const role = refs.roleSelect.value;
  state.role = role;
  refs.adminLoginBlock.classList.toggle("hidden", role !== "admin");
  refs.staffLoginBlock.classList.toggle("hidden", role !== "staff");
  refs.customerLoginBlock.classList.toggle("hidden", role !== "customer");
  if (role === "admin") hint("Use Admin password to login.");
  if (role === "staff") hint("Use Staff access code. Staff email is optional.");
  if (role === "customer") hint("Use Customer Email or Application ID. New email login creates a new application automatically.");
  enhancePasswordInputs(refs.loginCard);
}

async function login() {
  const cfg = settings();
  const role = state.role;
  if (role === "admin") {
    if (refs.adminPassword.value !== cfg.adminPassword) return hint(t("wrongAdminPass"));
    state.user = { role: "admin", id: "admin" };
  } else if (role === "staff") {
    if (refs.staffCode.value !== cfg.staffCode) return hint(t("wrongStaffCode"));
    const staffEmail = (refs.staffEmail.value || "").trim().toLowerCase();
    const matched = staffEmail ? staffMembers().find((s) => String(s.email || "").toLowerCase() === staffEmail) : null;
    const staffRole = matched?.role || "staff";
    state.user = {
      role: "staff",
      id: matched?.email || "staff",
      staffName: matched?.name || "Staff",
      staffRole,
      permissions: staffRolePermissions(staffRole),
    };
  } else {
    const query = refs.customerEmail.value.trim();
    if (!query) return hint(t("emailRequired"));
    const { customer: c, created } = await findOrCreateCustomerLoginRecord(query);
    if (!c) return hint(t("customerNotFound"));
    state.user = { role: "customer", id: c.appId, email: c.email || query.toLowerCase() };
    if (created) {
      alert(`New application created. Your Application ID: ${c.appId}`);
    }
  }

  addLoginHistory("login", state.user, "Manual login");
  refs.loginCard.classList.add("hidden");
  refs.publicHome.classList.add("hidden");
  refs.appPanel.classList.remove("hidden");
  refs.logoutBtn.classList.remove("hidden");
  state.tab = state.user.role === "customer" ? "trackApplication" : "dashboard";
  startSessionGuards();
  renderTabs();
  renderTab();
}

function logout(options = {}) {
  const opts = options || {};
  const currentUser = state.user ? { ...state.user } : null;
  if (currentUser && !opts.skipHistory) {
    addLoginHistory("logout", currentUser, "Manual logout");
  }
  state.user = null;
  state.tab = "dashboard";
  state.pendingEditSerial = null;
  clearIdleLogoutTimer();
  clearApplicantRefreshTimer();
  lastPrivilegedActivityAt = 0;
  safeStorageRemove(APP_KEYS.session);
  refs.publicHome.classList.remove("hidden");
  refs.loginCard.classList.remove("hidden");
  refs.appPanel.classList.add("hidden");
  refs.logoutBtn.classList.add("hidden");
  hint(opts.hintMessage || "");
  renderPublicHome();
}

function hint(msg) {
  refs.loginHint.textContent = msg;
}

function renderTabs() {
  const role = state.user.role;
  const perms = state.user.permissions || {};
  const names = role === "admin"
    ? [
      "dashboard",
      "companies",
      "agents",
      "candidates",
      "applications",
      "jobDemands",
      "documents",
      "payments",
      "reports",
      "staffManagement",
      "notifications",
      "settings",
    ]
      : role === "staff"
      ? [
        "dashboard",
        "companies",
        ...(perms.canManageAgents ? ["agents"] : []),
        ...(perms.canManageCandidates ? ["candidates"] : []),
        ...(perms.canManageApplications ? ["applications"] : []),
        ...(perms.canManageJobs ? ["jobDemands"] : []),
        ...(perms.canManageDocuments ? ["documents"] : []),
        ...(perms.canManagePayments ? ["payments"] : []),
        ...(perms.canReports ? ["reports"] : []),
        "notifications",
        ...(perms.canManageAgents ? ["staffManagement"] : []),
      ]
      : ["trackApplication", "applyNow", "companies"];

  refs.tabs.innerHTML = "";
  names.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = `tab ${state.tab === name ? "active" : ""}`;
    btn.textContent = t(name);
    btn.onclick = () => {
      state.tab = name;
      persistSessionState();
      renderTabs();
      renderTab();
    };
    refs.tabs.appendChild(btn);
  });
}

function visibleCompaniesForRole(role) {
  const cfg = settings();
  return companyProfiles().filter((c) => {
    if (c.key === "group296") {
      if (role === "admin") return true;
      return role === "staff" ? cfg.show296ForStaff : cfg.show296ForCustomer;
    }
    if (c.key === "travel") return cfg.showTravelNama;
    if (c.key === "umeed") return cfg.showUmeed;
    return true;
  });
}

function visibleCompanies() {
  const role = state.user?.role || "customer";
  return visibleCompaniesForRole(role);
}

function waLink(phone) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

function normalizeUrl(url) {
  const v = String(url || "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

function whatsappIconSvg() {
  return `<svg class="wa-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="#25D366" d="M19.11 17.29c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.15-1.21-.45-2.31-1.45-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.44.12-.58.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.83 1.17 3.03c.15.19 2.03 3.09 4.91 4.33.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z"/><path fill="#25D366" d="M16 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.73 6.48L3 29l6.73-1.7A12.94 12.94 0 0016 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.67c-1.96 0-3.88-.52-5.56-1.5l-.4-.23-3.99 1 1.06-3.88-.26-.4A10.6 10.6 0 015.33 16C5.33 10.11 10.11 5.33 16 5.33S26.67 10.11 26.67 16 21.89 26.67 16 26.67z"/></svg>`;
}

function renderCompanyCards(companies) {
  const wrap = document.createElement("div");
  wrap.className = "grid-2";
  const tpl = document.getElementById("companyCardTemplate");
  companies.forEach((c) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector(".company-name").textContent = c.name;
    node.querySelector(".company-contact").textContent = c.phone;
    node.querySelector(".company-description").textContent = c.description;
    const logo = node.querySelector(".logo-dot");
    if (c.image) {
      logo.style.backgroundImage = `url('${c.image}')`;
      logo.style.backgroundSize = "cover";
      logo.style.backgroundPosition = "center";
      logo.style.border = "2px solid #f2cf86";
    }
    const wa = node.querySelector(".wa-btn");
    wa.href = waLink(c.phone);
    wa.innerHTML = `${whatsappIconSvg()}<span>WhatsApp</span>`;

    const actions = node.querySelector(".company-actions");
    const links = socialLinks().filter((x) => x.companyKey === "all" || x.companyKey === c.key);
    if (links.length) {
      const socialWrap = document.createElement("div");
      socialWrap.className = "social-links";
      links.forEach((x) => {
        const a = document.createElement("a");
        a.className = "btn small secondary social-btn";
        a.href = normalizeUrl(x.url);
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = x.label || `${x.platform} Join`;
        socialWrap.appendChild(a);
      });
      actions.appendChild(socialWrap);
    }

    const grid = node.querySelector(".services-grid");
    c.services.forEach((s) => {
      const item = document.createElement("div");
      item.className = "service-item";
      item.innerHTML = `<div class="service-photo" style="background-image:url('${s.photo || ""}')"></div><strong>${s.name}</strong>${s.details ? `<p class="hint">${s.details}</p>` : ""}`;
      item.dataset.serviceName = s.name || "";
      item.dataset.serviceCompany = c.name || "";
      item.dataset.serviceDetails = s.details || "";
      item.title = "Click to apply for this service";
      grid.appendChild(item);
    });

    if (c.key === "travel") {
      const currencyOptions = `
        <option value="PKR">PKR</option>
        <option value="SAR">SAR</option>
        <option value="AED">AED</option>
        <option value="QAR">QAR</option>
        <option value="KWD">KWD</option>
        <option value="OMR">OMR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      `;
      const searchCard = document.createElement("div");
      searchCard.className = "service-item";
      searchCard.innerHTML = `
        <strong>Search Tickets (Google Flights)</strong>
        <input class="input gf-from" placeholder="From (e.g., ISB)" />
        <input class="input gf-to" placeholder="To (e.g., JED)" />
        <input class="input gf-date" type="date" />
        <select class="input gf-currency">${currencyOptions}</select>
        <button class="btn small gf-search-btn" type="button">Search Flights</button>
      `;
      const btn = searchCard.querySelector(".gf-search-btn");
      btn.onclick = () => {
        const from = (searchCard.querySelector(".gf-from").value || "").trim();
        const to = (searchCard.querySelector(".gf-to").value || "").trim();
        const date = (searchCard.querySelector(".gf-date").value || "").trim();
        const curr = (searchCard.querySelector(".gf-currency").value || "PKR").trim();
        const query = [from, to, date].filter(Boolean).join(" ");
        if (!query) {
          alert("Please enter at least From and To for flight search.");
          return;
        }
        const url = `https://www.google.com/travel/flights?curr=${encodeURIComponent(curr)}&q=${encodeURIComponent(query)}`;
        window.open(url, "_blank", "noopener");
      };
      grid.appendChild(searchCard);

      const hotelCard = document.createElement("div");
      hotelCard.className = "service-item";
      hotelCard.innerHTML = `
        <strong>Search Hotels (Google Hotels)</strong>
        <input class="input gh-city" placeholder="City or Hotel (e.g., Makkah)" />
        <input class="input gh-checkin" type="date" />
        <input class="input gh-checkout" type="date" />
        <select class="input gh-currency">${currencyOptions}</select>
        <button class="btn small gh-search-btn" type="button">Search Hotels</button>
      `;
      const hotelBtn = hotelCard.querySelector(".gh-search-btn");
      hotelBtn.onclick = () => {
        const city = (hotelCard.querySelector(".gh-city").value || "").trim();
        const checkin = (hotelCard.querySelector(".gh-checkin").value || "").trim();
        const checkout = (hotelCard.querySelector(".gh-checkout").value || "").trim();
        const curr = (hotelCard.querySelector(".gh-currency").value || "PKR").trim();
        if (!city) {
          alert("Please enter city/hotel for hotel search.");
          return;
        }
        const query = [city, checkin, checkout].filter(Boolean).join(" ");
        const url = `https://www.google.com/travel/hotels?curr=${encodeURIComponent(curr)}&q=${encodeURIComponent(query)}`;
        window.open(url, "_blank", "noopener");
      };
      grid.appendChild(hotelCard);
    }
    wrap.appendChild(node);
  });
  return wrap;
}

function renderCompanies() {
  return renderCompanyCards(visibleCompanies());
}

function renderPublicHome() {
  if (!refs.publicHome) return;
  refs.publicHome.classList.remove("hidden");
  refs.publicCompaniesWrap.innerHTML = "";
  refs.publicCompaniesWrap.appendChild(renderCompanyCards(visibleCompaniesForRole("customer")));

  if (refs.publicHomeBtn) {
    refs.publicHomeBtn.onclick = () => refs.publicHome.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const searchByAppId = () => {
    const value = (refs.publicTrackInput.value || "").trim().toLowerCase();
    const out = refs.publicTrackResult;
    if (!value) {
      out.innerHTML = `<p class="hint">Please enter Application ID.</p>`;
      return;
    }
    const c = customers().find((x) => String(x.appId || "").toLowerCase() === value);
    if (!c) {
      out.innerHTML = `<p class="hint">No application found for this ID.</p>`;
      return;
    }
    out.innerHTML = `<div class="notice"><p><strong>Name:</strong> ${c.name || "-"}</p><p><strong>Application ID:</strong> ${c.appId || "-"}</p><p><strong>Status:</strong> ${c.status || "-"}</p><p><strong>Visa Type:</strong> ${c.visaType || "-"}</p><p><strong>Country:</strong> ${c.country || "-"}</p><p><strong>Travel Date:</strong> ${c.travelDate || "-"}</p></div>`;
  };
  refs.publicTrackBtn.onclick = searchByAppId;
  if (refs.publicTrackInput) {
    refs.publicTrackInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchByAppId();
      }
    };
  }

  const jumpToLogin = (role) => {
    refs.roleSelect.value = role;
    setRoleInputs();
    refs.loginCard.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  refs.publicAdminLoginBtn.onclick = () => jumpToLogin("admin");
  refs.publicStaffLoginBtn.onclick = () => jumpToLogin("staff");
  refs.publicCustomerLoginBtn.onclick = () => jumpToLogin("customer");
  if (refs.publicTrackNavBtn) {
    refs.publicTrackNavBtn.onclick = () => refs.publicTrackBlock.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (refs.publicTrackJumpBtn) {
    refs.publicTrackJumpBtn.onclick = () => refs.publicTrackBlock.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (refs.publicApplyForm) {
    const countrySelect = refs.publicApplyForm.querySelector("[name=\"country\"]");
    const selectedServiceInput = refs.publicApplyForm.querySelector("[name=\"selectedServiceName\"]");
    const boughtServiceInput = refs.publicApplyForm.querySelector("[name=\"boughtService\"]");
    const companySelect = refs.publicApplyForm.querySelector("[name=\"serviceCompany\"]");
    const requiredDocsEl = refs.publicApplyForm.querySelector("[name=\"requiredDocuments\"]");
    countrySelect.innerHTML = `<option value="">Country for Visa</option>${countryOptionsHTML()}`;
    const syncPublicServiceOptions = () => {
      if (!boughtServiceInput || boughtServiceInput.tagName.toLowerCase() !== "select") return;
      const prev = boughtServiceInput.value || "";
      boughtServiceInput.innerHTML = `<option value="">Select Service</option>${serviceOptionsHTML(companySelect?.value || "")}`;
      if (prev) boughtServiceInput.value = prev;
      if (selectedServiceInput && !selectedServiceInput.value && boughtServiceInput.value) {
        selectedServiceInput.value = boughtServiceInput.value;
      }
    };
    syncPublicServiceOptions();

    refs.publicVisitVisaType.innerHTML = `<option value="">Visit Visa Type</option>${visitVisaTypeOptionsHTML()}`;
    const visaTypeEl = refs.publicApplyForm.querySelector("[name=\"visaType\"]");
    visaTypeEl.innerHTML = visaTypeOptionsHTML();
    const syncPublicVisit = () => {
      const isVisit = isVisitVisaType(visaTypeEl.value || "");
      if (isVisit && !refs.publicVisitVisaType.value) {
        const sub = visaSubTypeFromType(visaTypeEl.value || "", "Visit");
        if (sub) refs.publicVisitVisaType.value = sub;
      }
      refs.publicVisitVisaType.classList.toggle("hidden", !isVisit);
      refs.publicVisitRequiredDocs.classList.toggle("hidden", !isVisit);
      if (!isVisit) {
        refs.publicVisitVisaType.value = "";
        refs.publicVisitRequiredDocs.value = "";
      }
      refs.publicVisitRequiredDocs.value = isVisit ? visitRequiredDocsText(countrySelect.value || "", refs.publicVisitVisaType.value || "") : "";
      if (requiredDocsEl) {
        requiredDocsEl.value = requiredDocsForSelection({
          visaType: visaTypeEl.value || "",
          country: countrySelect.value || "",
          visitVisaType: refs.publicVisitVisaType.value || "",
          boughtService: boughtServiceInput.value || selectedServiceInput.value || "",
          tradeCategory: "",
          jobDemandTitle: "",
        });
      }
    };
    visaTypeEl.onchange = syncPublicVisit;
    countrySelect.onchange = syncPublicVisit;
    refs.publicVisitVisaType.onchange = syncPublicVisit;
    if (boughtServiceInput) {
      boughtServiceInput.onchange = () => {
        selectedServiceInput.value = boughtServiceInput.value || "";
        syncPublicVisit();
      };
    }
    if (companySelect) {
      companySelect.onchange = () => {
        syncPublicServiceOptions();
        if (selectedServiceInput) selectedServiceInput.value = boughtServiceInput?.value || "";
        syncPublicVisit();
      };
    }
    syncPublicVisit();

    refs.publicApplyNowBtn.onclick = () => {
      refs.publicApplySection.classList.remove("hidden");
      refs.publicApplySection.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    refs.publicApplyCancelBtn.onclick = () => {
      refs.publicApplySection.classList.add("hidden");
    };

    refs.publicApplyForm.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(refs.publicApplyForm);
      const obj = Object.fromEntries(fd.entries());
      if (!isVisitVisaType(obj.visaType)) {
        obj.visitVisaType = "";
        obj.visitRequiredDocs = "";
      } else {
        if (!obj.visitVisaType) obj.visitVisaType = visaSubTypeFromType(obj.visaType, "Visit");
        obj.visitRequiredDocs = visitRequiredDocsText(obj.country || "", obj.visitVisaType || "");
      }
      obj.requiredDocuments = requiredDocsForSelection({
        visaType: obj.visaType || "",
        country: obj.country || "",
        visitVisaType: obj.visitVisaType || "",
        boughtService: obj.boughtService || obj.selectedServiceName || "",
        tradeCategory: obj.tradeCategory || "",
        jobDemandTitle: obj.jobDemandTitle || "",
      });

      obj.appId = createApplicationId(obj.serviceCompany || obj.companyName, new Date());
      obj.serial = customers().length + 1;
      obj.status = "Applied";
      obj.stage = "Application";
      obj.createdAt = new Date().toISOString();
      obj.totalPayment = 0;
      obj.advancePayment = 0;
      obj.refundPayment = 0;
      obj.remainingPayment = 0;
      await ensureServerDriveFolder(obj.appId);
      obj.documents = await collectDocs(refs.publicApplyForm, obj.name || "customer", obj.appId);
      obj.boughtService = obj.boughtService || "";

      const all = customers();
      all.push(obj);
      save(APP_KEYS.customers, all);
      const saveResult = await saveApplicantsToServer(all);
      const n = notifications();
      n.unshift({
        at: new Date().toISOString(),
        text: `New service request from customer: ${obj.name} (${obj.appId}) | Service: ${obj.boughtService || "-"} | Company: ${obj.serviceCompany || "-"}`,
      });
      save(APP_KEYS.notifications, n);
      await autoDriveBackupIfEnabled();
      alert(`${saveResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync"}. Application ID: ${obj.appId}`);
      refs.publicApplyForm.reset();
      selectedServiceInput.value = "";
      boughtServiceInput.value = "";
      syncPublicVisit();
      refs.publicApplySection.classList.add("hidden");
    };

    refs.publicCompaniesWrap.querySelectorAll(".service-item[data-service-name]").forEach((item) => {
      item.onclick = () => {
        const serviceName = item.dataset.serviceName || "";
        const serviceCompany = item.dataset.serviceCompany || "Travel Nama";
        selectedServiceInput.value = serviceName;
        boughtServiceInput.value = serviceName;
        const preferredCompany = serviceCompany.includes("Umeed")
          ? "Umeed e Rozgar"
          : serviceCompany.includes("Travel")
            ? "Travel Nama"
            : companySelect.value;
        companySelect.value = preferredCompany;
        if (typeof companySelect.onchange === "function") companySelect.onchange();
        refs.publicApplySection.classList.remove("hidden");
        refs.publicApplySection.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });
    decorateFormFields(refs.publicHome);
  }
}

function countryOptionsHTML() {
  return ALL_COUNTRIES.map((country, index) => {
    const pin = index < GCC_COUNTRIES.length ? " (GCC)" : "";
    return `<option value="${country}">${country}${pin}</option>`;
  }).join("");
}

function statusOptionsHTML() {
  return STATUS_OPTIONS.map((status) => `<option value="${status}">${status}</option>`).join("");
}

function tradeOptionsHTML() {
  return allTradeOptions().map((trade) => `<option value="${trade}">${trade}</option>`).join("");
}

function visitVisaTypeOptionsHTML() {
  return VISIT_VISA_TYPES.map((type) => `<option value="${type}">${type}</option>`).join("");
}

function visaTypeOptionsHTML() {
  const work = WORK_VISA_TYPES.map((type) => `<option value="Work - ${type}">Work - ${type}</option>`).join("");
  const visit = VISIT_VISA_TYPES.map((type) => `<option value="Visit - ${type}">Visit - ${type}</option>`).join("");
  const umrah = UMRAH_VISA_TYPES.map((type) => `<option value="Umrah - ${type}">Umrah - ${type}</option>`).join("");
  return `
    <option value="Work">Work</option>
    <option value="Visit">Visit</option>
    <option value="Umrah">Umrah</option>
    ${work}
    ${visit}
    ${umrah}
  `;
}

function visaCategoryFromType(value) {
  const v = String(value || "").toLowerCase();
  if (!v) return "Work";
  if (v.startsWith("visit") || v.includes(" visit")) return "Visit";
  if (v.startsWith("umrah") || v.includes(" umrah")) return "Umrah";
  return "Work";
}

function isVisitVisaType(value) {
  return visaCategoryFromType(value) === "Visit";
}

function visaSubTypeFromType(value, category = "") {
  const text = String(value || "").trim();
  if (!text) return "";
  const parts = text.split(" - ");
  if (parts.length > 1) return parts.slice(1).join(" - ").trim();
  if (category && text.toLowerCase() === category.toLowerCase()) return "";
  return text;
}

function normalizeServiceForDocs(serviceValue) {
  return String(serviceValue || "")
    .trim()
    .toLowerCase();
}

function requiredDocsForSelection({ visaType, country, visitVisaType, boughtService, tradeCategory, jobDemandTitle }) {
  const category = visaCategoryFromType(visaType);
  const lines = [];
  const push = (arr) => arr.forEach((x) => { if (x) lines.push(String(x)); });

  const visaSub = visaSubTypeFromType(visaType, category);
  if (category === "Visit") {
    const selectedVisitType = visitVisaType || visaSub;
    if (selectedVisitType) lines.push(`Visit Visa Type: ${selectedVisitType}`);
    push(VISIT_REQUIRED_DOCS_BASE);
    push(VISIT_COUNTRY_REQUIREMENTS[country] || []);
  } else if (category === "Umrah") {
    if (visaSub) lines.push(`Umrah Visa Type: ${visaSub}`);
    push(UMRAH_REQUIRED_DOCS_BASE);
  } else {
    if (visaSub) lines.push(`Work Visa Type: ${visaSub}`);
    push(WORK_REQUIRED_DOCS_BASE);
  }

  const serviceKey = normalizeServiceForDocs(boughtService);
  Object.keys(SERVICE_REQUIRED_DOCS_MAP).forEach((key) => {
    if (serviceKey.includes(key)) push(SERVICE_REQUIRED_DOCS_MAP[key]);
  });

  const jobText = String(jobDemandTitle || tradeCategory || "").trim();
  if (jobText) {
    lines.push(`Trade/Job proof for "${jobText}" (experience letter / skill certificate if available).`);
  }

  const unique = lines.filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i);
  return unique.map((x, i) => `${i + 1}. ${x}`).join("\n");
}

function overseasDemandOptionsHTML() {
  return OVERSEAS_DEMAND_OPTIONS.map((type) => `<option value="${type}">${type}</option>`).join("");
}

function visitRequiredDocsText(country, visitType) {
  const byCountry = VISIT_COUNTRY_REQUIREMENTS[country] || [];
  const byType = visitType
    ? [`Visit Visa Type: ${visitType}`]
    : [];
  const list = [...byType, ...VISIT_REQUIRED_DOCS_BASE, ...byCountry];
  return list.map((x, i) => `${i + 1}. ${x}`).join("\n");
}

function serviceOptionsHTML(companyName = "") {
  const list = [];
  companyProfiles().forEach((c) => {
    (c.services || []).forEach((s) => list.push({ name: s.name, company: c.name }));
  });
  const filterName = String(companyName || "").trim().toLowerCase();
  const filtered = filterName
    ? list.filter((s) => String(s.company || "").trim().toLowerCase() === filterName)
    : list;
  const result = filtered.length ? filtered : list;
  return result
    .map((s) => `<option value="${s.name}">${s.name} (${s.company || "General"})</option>`)
    .join("");
}

function crmJobsList() {
  return Array.isArray(runtimeStore.crmJobs) ? runtimeStore.crmJobs : [];
}

function crmJobsOptionsHTML() {
  const jobs = crmJobsList();
  if (!jobs.length) return `<option value="">No job demands available</option>`;
  return jobs.map((j) => {
    const client = j.client_name ? ` | Client: ${j.client_name}` : "";
    const label = `${j.job_title || "Job"} | ${j.company_name || "-"}${client} | ${j.country_name || "-"} | Required: ${j.quantity || 0}`;
    return `<option value="${j.id}">${label}</option>`;
  }).join("");
}

function crmAgentsList() {
  return Array.isArray(runtimeStore.crmAgents) ? runtimeStore.crmAgents : [];
}

function crmAgentsOptionsHTML() {
  const list = crmAgentsList();
  if (!list.length) return `<option value="">No agents available</option>`;
  return list.map((a) => {
    const code = a.agent_code || a.agentCode || String(a.id || "").slice(0, 8).toUpperCase();
    return `<option value="${a.id}">${code} | ${a.name || "Agent"}${a.role ? ` (${a.role})` : ""}${a.email ? ` - ${a.email}` : ""}</option>`;
  }).join("");
}

function crmDocumentsList() {
  return Array.isArray(runtimeStore.crmDocuments) ? runtimeStore.crmDocuments : [];
}

function crmPaymentsList() {
  return Array.isArray(runtimeStore.crmPayments) ? runtimeStore.crmPayments : [];
}

function localAgentCode() {
  const used = new Set(
    crmAgentsList()
      .map((a) => String(a.agent_code || a.agentCode || "").trim())
      .filter((x) => /^[0-9]{4}$/.test(x))
  );
  for (let i = 0; i < 100; i += 1) {
    const code = String(Math.floor(Math.random() * 9000) + 1000);
    if (!used.has(code)) return code;
  }
  return String(Math.floor(Math.random() * 9000) + 1000);
}

function guardianDirectoryList() {
  const map = new Map();
  customers().forEach((c) => {
    const isGuardian = String(c.referenceType || "").trim().toLowerCase() === "guardian";
    if (!isGuardian && !c.guardianName) return;
    const name = String(c.guardianName || (isGuardian ? c.reference : "") || "").trim();
    const contact = String(c.guardianContact || c.nominationContact || "").trim();
    if (!name) return;
    const key = `${name.toLowerCase()}|${contact}`;
    if (map.has(key)) return;
    map.set(key, { name, contact });
  });
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function guardianOptionsHTML() {
  const list = guardianDirectoryList();
  if (!list.length) return `<option value="">No saved guardians yet</option>`;
  return list.map((g) => {
    const value = `${g.name}|${g.contact || ""}`;
    const label = `${g.name}${g.contact ? ` - ${g.contact}` : ""}`;
    return `<option value="${value}">${label}</option>`;
  }).join("");
}

function toArray(value) {
  if (Array.isArray(value)) return value.map((x) => String(x));
  if (value == null || value === "") return [];
  return [String(value)];
}

function setMultiSelectValues(selectEl, values) {
  if (!selectEl) return;
  const selected = new Set(toArray(values));
  Array.from(selectEl.options).forEach((opt) => {
    opt.selected = selected.has(String(opt.value));
  });
}

function linkedDocumentOptionsHTML({ passport = "", appId = "" } = {}) {
  const pass = String(passport || "").trim().toLowerCase();
  const app = String(appId || "").trim().toLowerCase();
  const docs = crmDocumentsList().filter((d) => {
    const docPass = String(d.passport_number || d.passport || "").trim().toLowerCase();
    const docApp = String(d.application_id || d.appId || "").trim().toLowerCase();
    if (!pass && !app) return true;
    return (pass && docPass === pass) || (app && docApp === app);
  });
  if (!docs.length) return `<option value="">No linked documents found</option>`;
  return docs.map((d) => {
    const value = String(d.id || d.document_url || `${d.application_id || d.appId}_${d.document_type}`);
    const label = `${d.document_type || "document"} | ${d.application_id || d.appId || "-"} | ${d.passport_number || d.passport || "-"} | ${d.candidate_name || d.name || "-"}`;
    return `<option value="${value}">${label}</option>`;
  }).join("");
}

function linkedPaymentOptionsHTML({ passport = "", appId = "" } = {}) {
  const pass = String(passport || "").trim().toLowerCase();
  const app = String(appId || "").trim().toLowerCase();
  const pays = crmPaymentsList().filter((p) => {
    const payPass = String(p.passport_number || p.passport || "").trim().toLowerCase();
    const payApp = String(p.application_id || p.appId || "").trim().toLowerCase();
    if (!pass && !app) return true;
    return (pass && payPass === pass) || (app && payApp === app);
  });
  if (!pays.length) return `<option value="">No linked payments found</option>`;
  return pays.map((p) => {
    const value = String(p.id || `${p.application_id || p.appId}_${p.payment_type}`);
    const label = `${p.payment_type || "payment"} | ${p.application_id || p.appId || "-"} | ${p.passport_number || p.passport || "-"} | PKR ${Number(p.amount || 0).toLocaleString()}`;
    return `<option value="${value}">${label}</option>`;
  }).join("");
}

function normalizeCompanyValue(value) {
  const v = String(value || "").toLowerCase();
  if (v.includes("travel")) return "travel";
  if (v.includes("umeed")) return "umeed";
  if (v.includes("296")) return "group296";
  return "other";
}

function filterCustomersData(data, searchBy, searchText, companyFilter) {
  const q = String(searchText || "").trim().toLowerCase();
  return data.filter((c) => {
    const companyBucket = normalizeCompanyValue(c.serviceCompany || c.companyName);
    const matchesCompany = companyFilter === "all" || companyBucket === companyFilter;
    if (!matchesCompany) return false;
    if (!q) return true;

    const map = {
      passport: c.passport,
      name: c.name,
      fatherName: c.fatherName,
      contact: c.contact,
      agentGuardian: `${c.referenceType || ""} ${c.agentName || ""} ${c.reference || ""} ${c.guardianName || ""} ${c.guardianContact || ""}`,
      appId: c.appId,
      companyName: c.companyName || c.serviceCompany,
      tradeCategory: c.tradeCategory,
      services: `${c.boughtService || ""} ${c.boughtServiceDetails || ""} ${c.serviceNotes || ""} ${c.visitVisaType || ""} ${c.overseasDemandType || ""} ${c.overseasDemandJob || ""} ${c.overseasDemandCountry || ""} ${c.jobDemandTitle || ""} ${c.jobDemandCompany || ""} ${c.jobDemandClientName || ""} ${c.requiredDocuments || ""} ${c.passportCopyDetail || ""} ${c.idCopyDetail || ""} ${c.medicalReportDetail || ""} ${c.ticketCopyDetail || ""} ${c.otherDocsDetail || ""} ${c.agentName || ""} ${c.reference || ""} ${c.guardianName || ""} ${(toArray(c.linkedDocumentIds).join(" "))} ${(toArray(c.linkedPaymentIds).join(" "))}`,
    };

    const val = String(map[searchBy] ?? "").toLowerCase();
    return val.includes(q);
  });
}

function customerFormHTML() {
  return `
  <h3>${t("addCustomer")}</h3>
  <form id="customerForm" class="candidate-form">
    <input type="hidden" name="editIndex" value="" />
    <input type="hidden" name="appId" value="" />
    <section class="form-section">
      <h4 class="form-section-title"><span class="section-icon-badge">PR</span><span>Customer Personal Details</span></h4>
      <div class="section-grid-4">
        <input class="input" name="name" placeholder="Name" required />
        <input class="input" name="fatherName" placeholder="Father Name" />
        <input class="input" name="passport" placeholder="Passport Number" />
        <input class="input" name="email" type="email" placeholder="Email" />
        <input class="input" name="contact" placeholder="Personal Contact" />
        <input class="input" name="nominationContact" placeholder="Nomination Contact" />
        <select class="input" name="tradeCategory" id="tradeCategorySelect">
          <option value="">Trade Category</option>
          ${tradeOptionsHTML()}
        </select>
        <input class="input hidden" name="manualTradeCategory" id="manualTradeCategoryInput" placeholder="Write trade/category manually" />
        <select class="input" name="status">
          ${statusOptionsHTML()}
        </select>
        <input class="input" name="agencyName" placeholder="Agency Name" />
      </div>
    </section>

    <section class="form-section">
      <h4 class="form-section-title"><span class="section-icon-badge">CP</span><span>Company And Application Details</span></h4>
      <div class="section-grid-4">
        <input class="input" name="companyName" placeholder="Company Name" />
        <select class="input" name="serviceCompany"><option>Travel Nama</option><option>Umeed e Rozgar</option></select>
        <select class="input" name="country" required>
          <option value="">Country for Visa</option>
          ${countryOptionsHTML()}
        </select>
        <select class="input" name="visaType">${visaTypeOptionsHTML()}</select>
        <select class="input hidden" name="visitVisaType" id="visitVisaTypeSelect">
          <option value="">Visit Visa Type</option>
          ${visitVisaTypeOptionsHTML()}
        </select>
        <input class="input" name="applyDate" type="date" />
        <input class="input" name="travelDate" type="date" />
        <select class="input" name="jobDemandId" id="jobDemandSelect">
          <option value="">Select Job Demand</option>
          ${crmJobsOptionsHTML()}
        </select>
        <input class="input" name="jobDemandTitle" id="jobDemandTitleInput" placeholder="Selected Job Demand Title" readonly />
        <input class="input" name="jobDemandCompany" id="jobDemandCompanyInput" placeholder="Selected Demand Company" readonly />
        <input class="input" name="jobDemandClientName" id="jobDemandClientNameInput" placeholder="Overseas Company / Client Name" readonly />
        <input class="input" name="jobDemandRequiredPersons" id="jobDemandRequiredPersonsInput" placeholder="Required Persons" readonly />
        <textarea class="input span-4" name="visitRequiredDocs" id="visitRequiredDocsInput" placeholder="Required documents for selected visit visa country/type"></textarea>
        <textarea class="input span-4" name="requiredDocuments" id="requiredDocumentsInput" placeholder="Required documents (auto generated and editable)"></textarea>
      </div>
    </section>

    <section class="form-section">
      <h4 class="form-section-title"><span class="section-icon-badge">RF</span><span>Reference And Sponsor Details</span></h4>
      <div class="section-grid-4">
        <select class="input" name="referenceType" id="referenceTypeSelect">
          <option value="Agent">Agent</option>
          <option value="Guardian">Guardian</option>
        </select>
        <input class="input" name="reference" placeholder="Reference (Auto from Agent/Guardian)" />
        <input class="input" name="eNumber" placeholder="E Number" />
        <input class="input" name="sponsorName" placeholder="Sponsor Name" />
        <input class="input" name="sponsorId" placeholder="Sponsor ID" />
        <input class="input" name="sponsorVisa" placeholder="Sponsor Visa Number" />
        <div class="ref-agent-fields section-grid-4 span-4">
          <select class="input" name="agentId" id="agentSelect">
            <option value="">Select Agent</option>
            ${crmAgentsOptionsHTML()}
          </select>
          <input class="input" name="agentName" id="agentNameInput" placeholder="Agent Name" readonly />
          <input class="input" name="agentEmail" id="agentEmailInput" placeholder="Agent Email" readonly />
          <input class="input" name="agentPhone" id="agentPhoneInput" placeholder="Agent Phone" readonly />
        </div>
        <div class="ref-guardian-fields section-grid-4 span-4 hidden">
          <select class="input" name="guardianSelect" id="guardianSelect">
            <option value="">Select Saved Guardian</option>
            ${guardianOptionsHTML()}
          </select>
          <input class="input" name="guardianName" placeholder="Guardian Name" />
          <input class="input" name="guardianContact" placeholder="Guardian Contact" />
        </div>
      </div>
    </section>

    <section class="form-section">
      <h4 class="form-section-title"><span class="section-icon-badge">PK</span><span>Payments</span></h4>
      <div class="section-grid-4">
        <select class="input" name="boughtService">
          <option value="">Service Purchased</option>
          ${serviceOptionsHTML()}
        </select>
        <input class="input" name="boughtServicePrice" type="number" placeholder="Service Price" value="0" />
        <input class="input" name="totalPayment" type="number" placeholder="Visa / Main Payment" value="0" />
        <input class="input" name="computedTotalPayment" type="number" placeholder="Total Payment (Auto)" value="0" readonly />
        <input class="input" name="advancePayment" type="number" placeholder="Advance Payment" value="0" />
        <input class="input" name="refundPayment" type="number" placeholder="Refund Payment" value="0" />
        <input class="input" name="remainingPayment" type="number" placeholder="Remaining Payment (Auto)" value="0" readonly />
        <input class="input span-2" name="refundReason" placeholder="Refund Reason / Details" />
        <div class="span-4">
          <label>Linked Payments (By Passport / Application)</label>
          <select class="input" name="linkedPaymentIds" id="linkedPaymentIdsSelect" multiple size="4">
            ${linkedPaymentOptionsHTML()}
          </select>
        </div>
      </div>
    </section>

    <section class="form-section">
      <h4 class="form-section-title"><span class="section-icon-badge">DC</span><span>Documents Attachments</span></h4>
      <div class="section-grid-4">
        <div>
          <label>Passport Copy</label>
          <input class="input" name="passportCopy" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
        </div>
        <div>
          <label>National ID Copy</label>
          <input class="input" name="idCopy" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
        </div>
        <div>
          <label>Medical Report</label>
          <input class="input" name="medicalReport" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
        </div>
        <div>
          <label>Ticket Copy</label>
          <input class="input" name="ticketCopy" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
        </div>
        <div class="span-2">
          <label>Other Documents</label>
          <input class="input" name="otherDocs" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx" />
        </div>
        <div class="span-2">
          <label>Linked Documents (By Passport / Application)</label>
          <select class="input" name="linkedDocumentIds" id="linkedDocumentIdsSelect" multiple size="4">
            ${linkedDocumentOptionsHTML()}
          </select>
        </div>
      </div>
    </section>

    <div class="form-actions-row">
      <button id="saveCustomerBtn" class="btn" type="submit">Save Customer</button>
      <button id="cancelEditBtn" class="btn secondary hidden" type="button">Cancel Edit</button>
    </div>
  </form>`;
}

async function fileToMeta(file) {
  return { name: file.name, type: file.type, size: file.size };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

async function collectDocs(form, customerName = "customer", applicationId = "") {
  if (applicationId) {
    const serverDocs = await uploadDocumentsViaServer(applicationId, form);
    if (serverDocs && Object.keys(serverDocs).length) return serverDocs;
  }

  const map = [
    ["passportCopy", "passportCopy"],
    ["idCopy", "idCopy"],
    ["medicalReport", "medicalReport"],
    ["ticketCopy", "ticketCopy"],
  ];
  const docs = {};
  for (const [field, key] of map) {
    const file = form.querySelector(`[name="${field}"]`)?.files?.[0];
    if (file) {
      if (isDriveConnected()) {
        try {
          docs[key] = await uploadDocumentFile(file, customerName);
        } catch {
          docs[key] = await fileToMeta(file);
        }
      } else {
        docs[key] = await fileToMeta(file);
      }
    }
  }
  const others = form.querySelector("[name=\"otherDocs\"]")?.files || [];
  if (others.length) {
    docs.otherDocs = [];
    for (const file of others) {
      if (isDriveConnected()) {
        try {
          docs.otherDocs.push(await uploadDocumentFile(file, customerName));
        } catch {
          docs.otherDocs.push(await fileToMeta(file));
        }
      } else {
        docs.otherDocs.push(await fileToMeta(file));
      }
    }
  }
  return docs;
}

async function addCustomer(form) {
  const fd = new FormData(form);
  const obj = {};
  for (const [key, value] of fd.entries()) {
    if (value instanceof File) continue;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (Array.isArray(obj[key])) obj[key].push(value);
      else obj[key] = [obj[key], value];
    } else {
      obj[key] = value;
    }
  }
  const all = customers();
  const editIndex = obj.editIndex === "" ? -1 : Number(obj.editIndex);
  delete obj.editIndex;
  delete obj.manualTradeCategory;

  const selectedTrade = form.querySelector("[name=\"tradeCategory\"]")?.value || "";
  const manualTrade = (form.querySelector("[name=\"manualTradeCategory\"]")?.value || "").trim();
  if (selectedTrade === "Other" && manualTrade) {
    obj.tradeCategory = manualTrade;
    const existing = customTrades();
    existing.push(manualTrade);
    saveCustomTrades(existing);
  } else if (selectedTrade !== "Other") {
    obj.tradeCategory = selectedTrade;
  }

  if (!isVisitVisaType(obj.visaType)) {
    obj.visitVisaType = "";
    obj.visitRequiredDocs = "";
  } else if (!obj.visitRequiredDocs) {
    if (!obj.visitVisaType) obj.visitVisaType = visaSubTypeFromType(obj.visaType, "Visit");
    obj.visitRequiredDocs = visitRequiredDocsText(obj.country || "", obj.visitVisaType || "");
  }
  obj.requiredDocuments = obj.requiredDocuments || requiredDocsForSelection({
    visaType: obj.visaType || "",
    country: obj.country || "",
    visitVisaType: obj.visitVisaType || "",
    boughtService: obj.boughtService || "",
    tradeCategory: obj.tradeCategory || "",
    jobDemandTitle: obj.jobDemandTitle || "",
  });

  obj.overseasDemandType = "";
  obj.overseasDemandCountry = "";
  obj.overseasDemandJob = "";
  obj.overseasDemandQuantity = "";
  obj.overseasDemandSalary = "";
  obj.overseasDemandNotes = "";
  obj.boughtServiceDetails = "";
  obj.serviceNotes = "";
  obj.passportCopyDetail = "";
  obj.idCopyDetail = "";
  obj.medicalReportDetail = "";
  obj.ticketCopyDetail = "";
  obj.otherDocsDetail = "";

  obj.linkedDocumentIds = toArray(obj.linkedDocumentIds).filter(Boolean);
  obj.linkedPaymentIds = toArray(obj.linkedPaymentIds).filter(Boolean);

  const basePayment = toNumber(obj.totalPayment);
  obj.boughtServicePrice = toNumber(obj.boughtServicePrice);
  obj.totalPayment = basePayment + obj.boughtServicePrice;
  obj.advancePayment = toNumber(obj.advancePayment);
  obj.refundPayment = toNumber(obj.refundPayment);
  obj.remainingPayment = calculateRemaining(obj.totalPayment, obj.advancePayment, obj.refundPayment);
  obj.stage = obj.stage || "Application";
  if (obj.jobDemandId) {
    const selectedJob = crmJobsList().find((j) => String(j.id) === String(obj.jobDemandId));
    if (selectedJob) {
      obj.jobDemandTitle = obj.jobDemandTitle || selectedJob.job_title || "";
      obj.jobDemandCompany = obj.jobDemandCompany || selectedJob.company_name || "";
      obj.jobDemandClientName = obj.jobDemandClientName || selectedJob.client_name || "";
      obj.jobDemandRequiredPersons = obj.jobDemandRequiredPersons || String(selectedJob.quantity || "");
    }
  }

  obj.referenceType = String(obj.referenceType || "").trim() || (obj.guardianName ? "Guardian" : "Agent");
  if (obj.guardianSelect && !obj.guardianName) {
    const [gName, gContact] = String(obj.guardianSelect || "").split("|");
    if (gName) obj.guardianName = gName;
    if (gContact && !obj.guardianContact) obj.guardianContact = gContact;
  }

  if (obj.referenceType === "Guardian") {
    obj.agentId = "";
    obj.agentName = "";
    obj.agentEmail = "";
    obj.agentPhone = "";
    obj.reference = obj.guardianName || obj.reference || "";
  }

  if (obj.agentId) {
    const selectedAgent = crmAgentsList().find((a) => String(a.id) === String(obj.agentId));
    if (selectedAgent) {
      obj.agentName = obj.agentName || selectedAgent.name || "";
      obj.agentEmail = obj.agentEmail || selectedAgent.email || "";
      obj.agentPhone = obj.agentPhone || selectedAgent.phone || "";
      if (!obj.reference) obj.reference = selectedAgent.name || "";
    }
  }

  if (state.user?.role === "staff" && state.user?.permissions?.canSubmitCandidatesOnly) {
    const staffAgent = crmAgentsList().find((a) => String(a.email || "").toLowerCase() === String(state.user.id || "").toLowerCase());
    if (staffAgent?.id) obj.agentId = String(staffAgent.id);
    obj.referenceType = "Agent";
    obj.agentEmail = state.user.id || "";
    obj.agentName = state.user.staffName || "Agent";
    if (staffAgent?.phone && !obj.agentPhone) obj.agentPhone = staffAgent.phone;
  }

  if (editIndex >= 0 && all[editIndex]) {
    const old = all[editIndex];
    if (!obj.linkedDocumentIds.length && Array.isArray(old.linkedDocumentIds)) {
      obj.linkedDocumentIds = [...old.linkedDocumentIds];
    }
    if (!obj.linkedPaymentIds.length && Array.isArray(old.linkedPaymentIds)) {
      obj.linkedPaymentIds = [...old.linkedPaymentIds];
    }
    obj.appId = old.appId;
    obj.serial = old.serial;
    obj.createdAt = old.createdAt;
  } else {
    obj.appId = createApplicationId(obj.serviceCompany || obj.companyName, new Date());
    obj.serial = all.length + 1;
    obj.createdAt = new Date().toISOString();
  }

  await ensureServerDriveFolder(obj.appId);
  const newDocs = await collectDocs(form, obj.name || "customer", obj.appId);

  if (editIndex >= 0 && all[editIndex]) {
    const old = all[editIndex];
    obj.documents = {
      ...(old.documents || {}),
      ...newDocs,
    };
    all[editIndex] = obj;
  } else {
    obj.documents = newDocs;
    all.push(obj);
  }
  save(APP_KEYS.customers, all);
  const saveResult = await saveApplicantsToServer(all);

  const n = notifications();
  n.unshift({
    at: new Date().toISOString(),
    text: `${editIndex >= 0 ? "Customer updated" : "New customer registered"}: ${obj.name} (${obj.appId})`,
  });
  save(APP_KEYS.notifications, n);

  alert(`${saveResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync"}. Application ID: ${obj.appId}`);
  await autoDriveBackupIfEnabled();
  renderTab();
}

function customerTable(data, options = {}) {
  const {
    canManage = false,
    canDelete = false,
    showContact = true,
    showFinancial = true,
    showDocs = true,
  } = options;
  const rows = data.map((c) => `
    <tr>
      <td>${c.serial}</td>
      <td>${c.appId}</td>
      <td>${c.name || ""}</td>
      <td>${c.fatherName || "-"}</td>
      <td>${c.passport || "-"}</td>
      ${showContact ? `<td>${c.contact || "-"}</td>` : ""}
      <td>${c.companyName || c.serviceCompany || ""}</td>
      <td>${c.status || ""}</td>
      <td>${c.country || ""}</td>
      <td>${c.visaType || ""}</td>
      <td>${c.applyDate || ""}</td>
      <td>${c.travelDate || ""}</td>
      <td>${c.agentName || c.reference || "-"}</td>
      <td>${c.jobDemandTitle || "-"}</td>
      <td>${c.jobDemandCompany || "-"}</td>
      <td>${c.jobDemandClientName || "-"}</td>
      <td>${c.jobDemandRequiredPersons || "-"}</td>
      <td>${Array.isArray(c.linkedDocumentIds) ? c.linkedDocumentIds.length : 0}</td>
      <td>${Array.isArray(c.linkedPaymentIds) ? c.linkedPaymentIds.length : 0}</td>
      <td>${c.boughtService || "-"}</td>
      <td>${c.boughtServiceDetails || "-"}</td>
      <td>${c.tradeCategory || ""}</td>
      ${showFinancial ? `<td>${c.boughtServicePrice || 0}</td><td>${c.totalPayment || 0}</td><td>${c.advancePayment || 0}</td><td>${c.remainingPayment || 0}</td><td>${c.refundPayment || 0}</td><td>${c.refundReason || ""}</td>` : ""}
      ${showDocs ? `<td>${(c.documents && Object.keys(c.documents).length) ? "Yes" : "No"}</td>` : ""}
      ${showContact ? `<td>${c.email || ""}</td>` : ""}
      ${canManage ? `<td><button class="btn small edit-customer-btn" data-serial="${c.serial}">Edit</button> ${canDelete ? `<button class="btn small ghost delete-customer-btn" data-serial="${c.serial}">Delete</button>` : ""}</td>` : ""}
    </tr>`).join("");

  return `
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>SR</th><th>Application ID</th><th>Name</th><th>Father Name</th><th>Passport No</th>${showContact ? "<th>Contact No</th>" : ""}<th>Company Name</th><th>Status</th><th>Country</th><th>Visa Type</th><th>Apply Date</th><th>Travel Date</th><th>Agent/Reference</th><th>Job Demand</th><th>Demand Company</th><th>Overseas Client</th><th>Required Persons</th><th>Linked Docs</th><th>Linked Payments</th><th>Service</th><th>Service Detail</th><th>Trade</th>
          ${showFinancial ? "<th>Service Price</th><th>Total</th><th>Advance</th><th>Remaining</th><th>Refund</th><th>Refund Reason</th>" : ""}
          ${showDocs ? "<th>Docs</th>" : ""}
          ${showContact ? "<th>Email</th>" : ""}
          ${canManage ? "<th>Actions</th>" : ""}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

function attachPaymentAutoCalc(form) {
  const totalInput = form.querySelector("[name=\"totalPayment\"]");
  const serviceInput = form.querySelector("[name=\"boughtServicePrice\"]");
  const computedTotalInput = form.querySelector("[name=\"computedTotalPayment\"]");
  const advanceInput = form.querySelector("[name=\"advancePayment\"]");
  const refundInput = form.querySelector("[name=\"refundPayment\"]");
  const remainingInput = form.querySelector("[name=\"remainingPayment\"]");
  if (!totalInput || !advanceInput || !refundInput || !remainingInput) return;

  const sync = () => {
    const combinedTotal = toNumber(totalInput.value) + toNumber(serviceInput?.value || 0);
    if (computedTotalInput) computedTotalInput.value = String(combinedTotal);
    remainingInput.value = String(calculateRemaining(combinedTotal, advanceInput.value, refundInput.value));
  };

  totalInput.addEventListener("input", sync);
  if (serviceInput) serviceInput.addEventListener("input", sync);
  advanceInput.addEventListener("input", sync);
  refundInput.addEventListener("input", sync);
  sync();
}

function attachTradeCategoryBehavior(form) {
  const tradeSelect = form.querySelector("[name=\"tradeCategory\"]");
  const manualInput = form.querySelector("[name=\"manualTradeCategory\"]");
  if (!tradeSelect || !manualInput) return;

  const sync = () => {
    const isOther = tradeSelect.value === "Other";
    manualInput.classList.toggle("hidden", !isOther);
    manualInput.required = isOther;
    if (!isOther) manualInput.value = "";
  };

  tradeSelect.addEventListener("change", sync);
  sync();
}

function attachReferenceTypeBehavior(form) {
  const typeEl = form.querySelector("[name=\"referenceType\"]");
  const agentWrap = form.querySelector(".ref-agent-fields");
  const guardianWrap = form.querySelector(".ref-guardian-fields");
  const guardianSelect = form.querySelector("[name=\"guardianSelect\"]");
  const guardianNameEl = form.querySelector("[name=\"guardianName\"]");
  const guardianContactEl = form.querySelector("[name=\"guardianContact\"]");
  const referenceEl = form.querySelector("[name=\"reference\"]");
  if (!typeEl || !agentWrap || !guardianWrap) return;

  const syncGuardianOptions = () => {
    if (!guardianSelect) return;
    const current = guardianSelect.value || "";
    guardianSelect.innerHTML = `<option value="">Select Saved Guardian</option>${guardianOptionsHTML()}`;
    if (current) guardianSelect.value = current;
  };

  const sync = () => {
    const type = String(typeEl.value || "Agent");
    const isAgent = type === "Agent";
    agentWrap.classList.toggle("hidden", !isAgent);
    guardianWrap.classList.toggle("hidden", isAgent);

    if (!isAgent) {
      const agentId = form.querySelector("[name=\"agentId\"]");
      const agentName = form.querySelector("[name=\"agentName\"]");
      const agentEmail = form.querySelector("[name=\"agentEmail\"]");
      const agentPhone = form.querySelector("[name=\"agentPhone\"]");
      if (agentId) agentId.value = "";
      if (agentName) agentName.value = "";
      if (agentEmail) agentEmail.value = "";
      if (agentPhone) agentPhone.value = "";
    } else {
      if (guardianSelect) guardianSelect.value = "";
      if (guardianNameEl) guardianNameEl.value = "";
      if (guardianContactEl) guardianContactEl.value = "";
    }
    if (referenceEl) {
      referenceEl.value = isAgent
        ? (form.querySelector("[name=\"agentName\"]")?.value || "")
        : (guardianNameEl?.value || "");
    }
  };

  if (guardianSelect) {
    guardianSelect.onchange = () => {
      const [name, contact] = String(guardianSelect.value || "").split("|");
      if (guardianNameEl) guardianNameEl.value = name || "";
      if (guardianContactEl) guardianContactEl.value = contact || "";
      if (referenceEl && String(typeEl.value || "Agent") === "Guardian") referenceEl.value = name || "";
    };
  }
  if (guardianNameEl) {
    guardianNameEl.oninput = () => {
      if (String(typeEl.value || "") === "Guardian" && referenceEl) referenceEl.value = guardianNameEl.value || "";
    };
  }
  typeEl.onchange = sync;
  syncGuardianOptions();
  sync();
}

function attachVisitVisaBehavior(form) {
  const visaTypeEl = form.querySelector("[name=\"visaType\"]");
  const countryEl = form.querySelector("[name=\"country\"]");
  const visitTypeEl = form.querySelector("[name=\"visitVisaType\"]");
  const docsEl = form.querySelector("[name=\"visitRequiredDocs\"]");
  const requiredEl = form.querySelector("[name=\"requiredDocuments\"]");
  const serviceEl = form.querySelector("[name=\"boughtService\"]");
  const tradeEl = form.querySelector("[name=\"tradeCategory\"]");
  const jobDemandTitleEl = form.querySelector("[name=\"jobDemandTitle\"]");
  if (!visaTypeEl || !countryEl || !visitTypeEl || !docsEl) return;
  const currentVisa = visaTypeEl.value || "";
  visaTypeEl.innerHTML = visaTypeOptionsHTML();
  if (currentVisa) visaTypeEl.value = currentVisa;

  const sync = () => {
    const isVisit = isVisitVisaType(visaTypeEl.value || "");
    if (isVisit && !visitTypeEl.value) {
      const sub = visaSubTypeFromType(visaTypeEl.value || "", "Visit");
      if (sub) visitTypeEl.value = sub;
    }
    visitTypeEl.classList.toggle("hidden", !isVisit);
    docsEl.classList.toggle("hidden", !isVisit);
    visitTypeEl.required = isVisit;
    if (!isVisit) {
      visitTypeEl.value = "";
      docsEl.value = "";
    } else {
      docsEl.value = visitRequiredDocsText(String(countryEl.value || ""), String(visitTypeEl.value || ""));
    }
    if (requiredEl) {
      requiredEl.value = requiredDocsForSelection({
        visaType: visaTypeEl.value || "",
        country: countryEl.value || "",
        visitVisaType: visitTypeEl.value || "",
        boughtService: serviceEl?.value || "",
        tradeCategory: tradeEl?.value || "",
        jobDemandTitle: jobDemandTitleEl?.value || "",
      });
    }
  };

  visaTypeEl.onchange = sync;
  countryEl.onchange = sync;
  visitTypeEl.onchange = sync;
  if (serviceEl) serviceEl.onchange = sync;
  if (tradeEl) tradeEl.onchange = sync;
  if (jobDemandTitleEl) jobDemandTitleEl.onchange = sync;
  sync();
}

function attachOverseasDemandBehavior(form) {
  const typeEl = form.querySelector("[name=\"overseasDemandType\"]");
  const countryEl = form.querySelector("[name=\"overseasDemandCountry\"]");
  const jobEl = form.querySelector("[name=\"overseasDemandJob\"]");
  const qtyEl = form.querySelector("[name=\"overseasDemandQuantity\"]");
  const salaryEl = form.querySelector("[name=\"overseasDemandSalary\"]");
  const notesEl = form.querySelector("[name=\"overseasDemandNotes\"]");
  if (!typeEl || !countryEl || !jobEl || !qtyEl || !salaryEl || !notesEl) return;

  const fields = [countryEl, jobEl, qtyEl, salaryEl, notesEl];
  const sync = () => {
    const active = String(typeEl.value || "") && typeEl.value !== "No New Demand";
    fields.forEach((f) => f.classList.toggle("hidden", !active));
    countryEl.required = active;
    jobEl.required = active;
    qtyEl.required = active;
    if (!active) {
      countryEl.value = "";
      jobEl.value = "";
      qtyEl.value = "";
      salaryEl.value = "";
      notesEl.value = "";
    }
  };

  typeEl.onchange = sync;
  sync();
}

function attachJobDemandBehavior(form) {
  const demandEl = form.querySelector("[name=\"jobDemandId\"]");
  const titleEl = form.querySelector("[name=\"jobDemandTitle\"]");
  const companyEl = form.querySelector("[name=\"jobDemandCompany\"]");
  const clientEl = form.querySelector("[name=\"jobDemandClientName\"]");
  const reqEl = form.querySelector("[name=\"jobDemandRequiredPersons\"]");
  if (!demandEl || !titleEl || !companyEl || !reqEl) return;

  const jobs = crmJobsList();
  const existingValue = demandEl.value;
  demandEl.innerHTML = `<option value="">Select Job Demand</option>${crmJobsOptionsHTML()}`;
  if (existingValue) demandEl.value = existingValue;

  const sync = () => {
    const selected = jobs.find((j) => String(j.id) === String(demandEl.value));
    if (!selected) {
      titleEl.value = "";
      companyEl.value = "";
      if (clientEl) clientEl.value = "";
      reqEl.value = "";
      return;
    }
    titleEl.value = selected.job_title || "";
    companyEl.value = selected.company_name || "";
    if (clientEl) clientEl.value = selected.client_name || "";
    reqEl.value = String(selected.quantity || "");

    const companyNameInput = form.querySelector("[name=\"companyName\"]");
    const serviceCompanyInput = form.querySelector("[name=\"serviceCompany\"]");
    const countryInput = form.querySelector("[name=\"country\"]");
    const tradeSelect = form.querySelector("[name=\"tradeCategory\"]");
    const manualTradeInput = form.querySelector("[name=\"manualTradeCategory\"]");
    if (companyNameInput && !companyNameInput.value) companyNameInput.value = selected.company_name || "";
    if (serviceCompanyInput && selected.company_name) serviceCompanyInput.value = selected.company_name;
    if (countryInput && !countryInput.value) countryInput.value = selected.country_name || "";
    if (tradeSelect && selected.job_title) {
      const wanted = String(selected.job_title || "");
      const options = allTradeOptions().map((x) => x.toLowerCase());
      if (options.includes(wanted.toLowerCase())) {
        tradeSelect.value = wanted;
        if (manualTradeInput) {
          manualTradeInput.classList.add("hidden");
          manualTradeInput.required = false;
          manualTradeInput.value = "";
        }
      } else if (manualTradeInput) {
        tradeSelect.value = "Other";
        manualTradeInput.classList.remove("hidden");
        manualTradeInput.required = true;
        manualTradeInput.value = wanted;
      }
    }
    titleEl.dispatchEvent(new Event("change"));
  };

  demandEl.onchange = sync;
  sync();
}

function selectedMultiValues(selectEl) {
  if (!selectEl) return [];
  return Array.from(selectEl.selectedOptions || [])
    .map((opt) => String(opt.value || "").trim())
    .filter(Boolean);
}

function attachInterlinkBehavior(form) {
  const referenceTypeEl = form.querySelector("[name=\"referenceType\"]");
  const agentEl = form.querySelector("[name=\"agentId\"]");
  const agentNameEl = form.querySelector("[name=\"agentName\"]");
  const agentEmailEl = form.querySelector("[name=\"agentEmail\"]");
  const agentPhoneEl = form.querySelector("[name=\"agentPhone\"]");
  const referenceEl = form.querySelector("[name=\"reference\"]");
  const guardianNameEl = form.querySelector("[name=\"guardianName\"]");
  const guardianContactEl = form.querySelector("[name=\"guardianContact\"]");
  const passportEl = form.querySelector("[name=\"passport\"]");
  const appIdEl = form.querySelector("[name=\"appId\"]");
  const linkedDocsEl = form.querySelector("[name=\"linkedDocumentIds\"]");
  const linkedPaysEl = form.querySelector("[name=\"linkedPaymentIds\"]");

  const existingAgent = agentEl?.value || "";
  if (agentEl) {
    agentEl.innerHTML = `<option value="">Select Agent</option>${crmAgentsOptionsHTML()}`;
    if (existingAgent) agentEl.value = existingAgent;
  }

  const syncAgent = () => {
    if (!agentEl) return;
    const selected = crmAgentsList().find((a) => String(a.id) === String(agentEl.value || ""));
    if (!selected) {
      if (agentNameEl) agentNameEl.value = "";
      if (agentEmailEl) agentEmailEl.value = "";
      if (agentPhoneEl) agentPhoneEl.value = "";
      return;
    }
    if (agentNameEl) agentNameEl.value = selected.name || "";
    if (agentEmailEl) agentEmailEl.value = selected.email || "";
    if (agentPhoneEl) agentPhoneEl.value = selected.phone || "";
    if (String(referenceTypeEl?.value || "Agent") === "Agent" && referenceEl) {
      referenceEl.value = selected.name || "";
    }
  };

  const syncLinked = () => {
    const passport = String(passportEl?.value || "").trim();
    const appId = String(appIdEl?.value || "").trim();

    if (linkedDocsEl) {
      const selectedDocs = selectedMultiValues(linkedDocsEl);
      linkedDocsEl.innerHTML = linkedDocumentOptionsHTML({ passport, appId });
      setMultiSelectValues(linkedDocsEl, selectedDocs);
    }
    if (linkedPaysEl) {
      const selectedPays = selectedMultiValues(linkedPaysEl);
      linkedPaysEl.innerHTML = linkedPaymentOptionsHTML({ passport, appId });
      setMultiSelectValues(linkedPaysEl, selectedPays);
    }
  };

  if (agentEl) agentEl.onchange = syncAgent;
  if (passportEl) passportEl.oninput = syncLinked;
  if (appIdEl) appIdEl.oninput = syncLinked;

  syncAgent();
  syncLinked();
}

function beginCustomerEdit(serial) {
  if (state.user?.role === "staff" && !state.user?.permissions?.canEdit) {
    alert("Your staff role is not allowed to edit records.");
    return;
  }
  if (!confirm(`Edit customer serial #${serial}?`)) return;
  state.pendingEditSerial = Number(serial);
  state.tab = "newApplication";
  renderTabs();
  renderTab();
}

function resetCustomerFormMode() {
  const form = document.getElementById("customerForm");
  if (!form) return;
  form.reset();
  form.querySelector("[name=\"editIndex\"]").value = "";
  form.querySelector("[name=\"appId\"]").value = "";
  const saveBtn = document.getElementById("saveCustomerBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");
  if (saveBtn) saveBtn.textContent = "Save Customer";
  if (cancelBtn) cancelBtn.classList.add("hidden");
  const remainingInput = form.querySelector("[name=\"remainingPayment\"]");
  if (remainingInput) remainingInput.value = "0";
  const computedTotalInput = form.querySelector("[name=\"computedTotalPayment\"]");
  if (computedTotalInput) computedTotalInput.value = "0";
  const manualTrade = form.querySelector("[name=\"manualTradeCategory\"]");
  if (manualTrade) {
    manualTrade.classList.add("hidden");
    manualTrade.required = false;
    manualTrade.value = "";
  }
  attachVisitVisaBehavior(form);
  attachOverseasDemandBehavior(form);
  attachJobDemandBehavior(form);
  attachReferenceTypeBehavior(form);
  attachInterlinkBehavior(form);
}

function loadCustomerIntoFormBySerial(serial, form) {
  const all = customers();
  const index = all.findIndex((x) => Number(x.serial) === Number(serial));
  if (index < 0) return false;
  const c = all[index];
  form.querySelector("[name=\"editIndex\"]").value = String(index);
  const appIdInput = form.querySelector("[name=\"appId\"]");
  if (appIdInput) appIdInput.value = c.appId || "";
  const fields = [
    "name", "fatherName", "passport", "companyName", "country", "visaType", "visitVisaType", "visitRequiredDocs", "requiredDocuments", "contact", "nominationContact",
    "email", "tradeCategory", "status", "agencyName", "referenceType", "agentId", "agentName", "agentEmail", "agentPhone", "guardianSelect", "reference", "guardianName", "guardianContact", "eNumber", "sponsorName", "sponsorId", "sponsorVisa",
    "applyDate", "travelDate", "advancePayment", "remainingPayment", "refundPayment", "refundReason",
    "serviceCompany", "boughtService", "boughtServicePrice",
    "jobDemandId", "jobDemandTitle", "jobDemandCompany", "jobDemandClientName", "jobDemandRequiredPersons",
  ];
  fields.forEach((f) => {
    const el = form.querySelector(`[name="${f}"]`);
    if (el) el.value = c[f] ?? "";
  });
  const basePaymentInput = form.querySelector("[name=\"totalPayment\"]");
  if (basePaymentInput) {
    const basePayment = Math.max(0, toNumber(c.totalPayment) - toNumber(c.boughtServicePrice));
    basePaymentInput.value = String(basePayment);
  }
  const computedTotalInput = form.querySelector("[name=\"computedTotalPayment\"]");
  if (computedTotalInput) computedTotalInput.value = String(toNumber(c.totalPayment));
  const guardianSelectEl = form.querySelector("[name=\"guardianSelect\"]");
  if (guardianSelectEl && c.guardianName) {
    guardianSelectEl.value = `${c.guardianName}|${c.guardianContact || ""}`;
  }

  const tradeSelect = form.querySelector("[name=\"tradeCategory\"]");
  const manualTrade = form.querySelector("[name=\"manualTradeCategory\"]");
  if (tradeSelect && manualTrade) {
    const selected = String(c.tradeCategory || "");
    const options = allTradeOptions().map((x) => x.toLowerCase());
    if (selected && !options.includes(selected.toLowerCase())) {
      tradeSelect.value = "Other";
      manualTrade.classList.remove("hidden");
      manualTrade.required = true;
      manualTrade.value = selected;
    } else {
      tradeSelect.value = selected;
      manualTrade.classList.add("hidden");
      manualTrade.required = false;
      manualTrade.value = "";
    }
  }

  const saveBtn = document.getElementById("saveCustomerBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");
  if (saveBtn) saveBtn.textContent = "Update Customer";
  if (cancelBtn) cancelBtn.classList.remove("hidden");
  attachVisitVisaBehavior(form);
  attachOverseasDemandBehavior(form);
  attachJobDemandBehavior(form);
  attachReferenceTypeBehavior(form);
  attachInterlinkBehavior(form);
  setMultiSelectValues(form.querySelector("[name=\"linkedDocumentIds\"]"), toArray(c.linkedDocumentIds).filter(Boolean));
  setMultiSelectValues(form.querySelector("[name=\"linkedPaymentIds\"]"), toArray(c.linkedPaymentIds).filter(Boolean));
  return true;
}

async function deleteCustomer(serial) {
  if (state.user?.role === "staff" && !state.user?.permissions?.canDelete) {
    alert("Your staff role is not allowed to delete records.");
    return;
  }
  const all = customers();
  const index = all.findIndex((x) => Number(x.serial) === Number(serial));
  if (index < 0) return;
  const c = all[index];
  if (!confirm(`Delete customer ${c.name || ""} (${c.appId})? This cannot be undone.`)) return;

  all.splice(index, 1);
  all.forEach((item, i) => { item.serial = i + 1; });
  save(APP_KEYS.customers, all);
  const deleteResult = await deleteApplicantFromSupabase(c);

  const n = notifications();
  n.unshift({
    at: new Date().toISOString(),
    text: `Customer deleted: ${c.name || "Unknown"} (${c.appId})`,
  });
  save(APP_KEYS.notifications, n);
  autoDriveBackupIfEnabled();
  alert(deleteResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync");
  renderTab();
}

function renderDashboard() {
  const data = customers();
  const analytics = buildAnalytics();
  const localMetrics = {
    totalCandidates: data.length,
    activeVisaCases: data.filter((x) => String(x.stage || "").toLowerCase() !== "ticket").length,
    agentsCount: Array.isArray(runtimeStore.crmAgents) ? runtimeStore.crmAgents.length : 0,
    countriesActive: new Set(data.map((x) => x.country).filter(Boolean)).size,
    monthlyRevenue: data
      .filter((x) => String(x.applyDate || "").startsWith(new Date().toISOString().slice(0, 7)))
      .reduce((s, x) => s + Number(x.totalPayment || 0), 0),
    pendingApplications: data.filter((x) => ["Applied", "Under Process", "Documents Pending"].includes(String(x.status || ""))).length,
  };
  const m = runtimeStore.crmMetrics || localMetrics;

  const wrap = document.createElement("div");
  wrap.className = "grid-3";
  wrap.innerHTML = `
    <div class="kpi"><h3>Total Candidates</h3><p id="kpiTotalCandidates">${Number(m.totalCandidates || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Active Visa Cases</h3><p id="kpiActiveCases">${Number(m.activeVisaCases || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Agents Count</h3><p id="kpiAgentsCount">${Number(m.agentsCount || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Countries Active</h3><p id="kpiCountriesActive">${Number(m.countriesActive || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Monthly Revenue</h3><p id="kpiMonthlyRevenue">PKR ${Number(m.monthlyRevenue || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Pending Applications</h3><p id="kpiPendingApplications">${Number(m.pendingApplications || 0).toLocaleString()}</p></div>
    <div class="kpi"><h3>Quick Actions</h3>
      <div class="top-actions">
        <button id="qaAddCandidate" class="btn small">Add Candidate</button>
        <button id="qaCreateApplication" class="btn small">Create Application</button>
        <button id="qaAddJobDemand" class="btn small">Add Job Demand</button>
        <button id="qaUploadDocument" class="btn small">Upload Document</button>
      </div>
    </div>
    <div class="kpi"><h3>CEO</h3><p>Muhammad Arslan</p></div>
    <div class="kpi"><h3>Head Office</h3><p>Flat 06, 2nd Floor, 29-C Block, Satellite Town, Rawalpindi</p></div>
    ${renderBarChart("Applications Trend (Last 6 Months)", analytics.monthlyApplications)}
    ${renderLineChart("Sales Trend (Last 6 Months)", analytics.monthlySales)}
  `;
  setTimeout(() => {
    const go = (tab) => {
      state.tab = tab;
      renderTabs();
      renderTab();
    };
    const bind = (id, tab) => {
      const el = document.getElementById(id);
      if (el) el.onclick = () => go(tab);
    };
    bind("qaAddCandidate", "candidates");
    bind("qaCreateApplication", "applications");
    bind("qaAddJobDemand", "jobDemands");
    bind("qaUploadDocument", "documents");
  }, 0);
  fetchDashboardMetrics().then((metrics) => {
    if (!metrics) return;
    runtimeStore.crmMetrics = metrics;
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    set("kpiTotalCandidates", Number(metrics.totalCandidates || 0).toLocaleString());
    set("kpiActiveCases", Number(metrics.activeVisaCases || 0).toLocaleString());
    set("kpiAgentsCount", Number(metrics.agentsCount || 0).toLocaleString());
    set("kpiCountriesActive", Number(metrics.countriesActive || 0).toLocaleString());
    set("kpiMonthlyRevenue", `PKR ${Number(metrics.monthlyRevenue || 0).toLocaleString()}`);
    set("kpiPendingApplications", Number(metrics.pendingApplications || 0).toLocaleString());
  }).catch(() => {});
  return wrap;
}

function renderReports() {
  const data = customers();
  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);
  const currentYear = today.slice(0, 4);

  const daily = data.filter((x) => (x.applyDate || "").startsWith(today));
  const monthly = data.filter((x) => (x.applyDate || "").startsWith(currentMonth));
  const yearly = data.filter((x) => (x.applyDate || "").startsWith(currentYear));

  const card = (label, arr) => {
    const sales = arr.reduce((s, x) => s + Number(x.totalPayment || 0), 0);
    const refund = arr.reduce((s, x) => s + Number(x.refundPayment || 0), 0);
    return `<div class="kpi"><h3>${label}</h3><p>Customers: ${arr.length}</p><p>Sales: PKR ${sales.toLocaleString()}</p><p>Refund: PKR ${refund.toLocaleString()}</p></div>`;
  };

  const div = document.createElement("div");
  const analytics = buildAnalytics();
  const reports = runtimeStore.crmReports || {};
  const countryRows = (reports.countryDemand || []).slice(0, 6).map((r) => `<tr><td>${r.country || "-"}</td><td>${r.applications || 0}</td></tr>`).join("");
  const agentRows = (reports.agentPerformance || []).slice(0, 6).map((r) => `<tr><td>${r.agent || "-"}</td><td>${r.candidates || 0}</td></tr>`).join("");
  const monthRows = (reports.monthlyRecruitment || []).slice(0, 6).map((r) => `<tr><td>${r.month || "-"}</td><td>${r.total || 0}</td></tr>`).join("");
  const revenueRows = (reports.revenue || []).slice(0, 6).map((r) => `<tr><td>${r.month || "-"}</td><td>PKR ${Number(r.amount || 0).toLocaleString()}</td></tr>`).join("");
  div.className = "grid-3";
  div.innerHTML = card("Daily Report", daily) + card("Monthly Report", monthly) + card("Yearly Report", yearly)
    + `<div class="kpi"><h3>Country Demand Report</h3><div class="table-wrap"><table><thead><tr><th>Country</th><th>Applications</th></tr></thead><tbody>${countryRows || "<tr><td colspan='2'>No data</td></tr>"}</tbody></table></div></div>`
    + `<div class="kpi"><h3>Agent Performance Report</h3><div class="table-wrap"><table><thead><tr><th>Agent</th><th>Candidates</th></tr></thead><tbody>${agentRows || "<tr><td colspan='2'>No data</td></tr>"}</tbody></table></div></div>`
    + `<div class="kpi"><h3>Monthly Recruitment Report</h3><div class="table-wrap"><table><thead><tr><th>Month</th><th>Candidates</th></tr></thead><tbody>${monthRows || "<tr><td colspan='2'>No data</td></tr>"}</tbody></table></div></div>`
    + `<div class="kpi"><h3>Revenue Report</h3><div class="table-wrap"><table><thead><tr><th>Month</th><th>Amount</th></tr></thead><tbody>${revenueRows || "<tr><td colspan='2'>No data</td></tr>"}</tbody></table></div></div>`
    + renderBarChart("Monthly Applications", analytics.monthlyApplications)
    + renderBarChart("Monthly Sales", analytics.monthlySales, (v) => `PKR ${Number(v).toLocaleString()}`)
    + renderCompanyProgressChart(analytics.companyProgress);
  fetchCrmReports().then((next) => {
    if (!next) return;
    runtimeStore.crmReports = next;
    if (state.tab === "reports") renderTab();
  }).catch(() => {});
  return div;
}

function renderNotifications() {
  const data = notifications();
  const div = document.createElement("div");
  div.innerHTML = `<h3>${t("notifications")}</h3>`;
  if (data.length) {
    data.slice(0, 50).forEach((n) => {
      const p = document.createElement("div");
      p.className = "notice";
      p.textContent = `${new Date(n.at).toLocaleString()} - ${n.text}`;
      div.appendChild(p);
    });
  } else {
    div.innerHTML += `<p class="hint">No notifications yet.</p>`;
  }

  if (state.user?.role === "admin") {
    const history = loadLoginHistory();
    const rows = history.slice(0, 200).map((h, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${new Date(h.at).toLocaleString()}</td>
        <td>${h.role || "-"}</td>
        <td>${h.name || "-"}</td>
        <td>${h.action || "-"}</td>
        <td>${h.details || "-"}</td>
      </tr>
    `).join("");
    div.innerHTML += `
      <hr>
      <h3>Login History (Admin)</h3>
      <p class="hint">Shows Admin/Staff/Customer login and logout events.</p>
      <button id="clearLoginHistoryBtn" class="btn ghost small" type="button">Clear Login History</button>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Date/Time</th><th>Role</th><th>User</th><th>Action</th><th>Details</th></tr>
          </thead>
          <tbody>${rows || "<tr><td colspan='6'>No login history yet.</td></tr>"}</tbody>
        </table>
      </div>
    `;
    setTimeout(() => {
      const clearBtn = document.getElementById("clearLoginHistoryBtn");
      if (!clearBtn) return;
      clearBtn.onclick = () => {
        if (!confirm("Clear all login history?")) return;
        saveLoginHistory([]);
        renderTab();
      };
    }, 0);
  }

  return div;
}

function exportCsv(rows) {
  const headers = Object.keys(rows[0] || {});
  const lines = [headers.join(",")].concat(rows.map((row) => headers.map((h) => `"${String(row[h] || "").replaceAll('"', '""')}"`).join(",")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `customers_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

function renderSettings() {
  const cfg = settings();
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Admin Security & Controls</h3>
    <div class="grid-2">
      <div>
        <label>Admin Password</label>
        <input id="setAdminPass" class="input" type="password" value="${cfg.adminPassword}" />
      </div>
      <div>
        <label>Staff Code</label>
        <input id="setStaffCode" class="input" type="password" value="${cfg.staffCode}" />
      </div>
      <div>
        <label>Google Drive Folder URL</label>
        <input id="setDrive" class="input" value="${cfg.driveUrl}" placeholder="https://drive.google.com/..." />
      </div>
      <div>
        <label>Google Sheets URL</label>
        <input id="setSheets" class="input" value="${cfg.sheetsUrl}" placeholder="https://docs.google.com/spreadsheets/..." />
      </div>
      <div>
        <label>Google OAuth Client ID (for Drive login)</label>
        <input id="setGoogleClientId" class="input" value="${cfg.googleClientId || ""}" placeholder="xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com" />
      </div>
      <div>
        <label>Google Drive Backup Folder Name</label>
        <input id="setDriveFolderName" class="input" value="${cfg.driveFolderName || "296 Group App Data"}" placeholder="296 Group App Data" />
      </div>
    </div>

    <h3>Feature Visibility</h3>
    <label><input id="set296staff" type="checkbox" ${cfg.show296ForStaff ? "checked" : ""} /> Show 296 Group to Staff</label><br>
    <label><input id="set296customer" type="checkbox" ${cfg.show296ForCustomer ? "checked" : ""} /> Show 296 Group to Customer</label><br>
    <label><input id="setTravel" type="checkbox" ${cfg.showTravelNama ? "checked" : ""} /> Show Travel Nama</label><br>
    <label><input id="setUmeed" type="checkbox" ${cfg.showUmeed ? "checked" : ""} /> Show Umeed e Rozgar</label><br><br>

    <h3>Staff Detail Visibility</h3>
    <label><input id="setStaffContact" type="checkbox" ${cfg.showStaffEmailContact ? "checked" : ""} /> Show Email/Contact to Staff</label><br>
    <label><input id="setStaffPayments" type="checkbox" ${cfg.showStaffPayments ? "checked" : ""} /> Show Payment Columns to Staff</label><br>
    <label><input id="setStaffDocs" type="checkbox" ${cfg.showStaffDocuments ? "checked" : ""} /> Show Documents to Staff</label><br><br>

    <h3>Customer Detail Visibility</h3>
    <label><input id="setCustomerPayment" type="checkbox" ${cfg.showCustomerPaymentDetails ? "checked" : ""} /> Show Payment Status to Customers</label><br>
    <label><input id="setCustomerTravel" type="checkbox" ${cfg.showCustomerTravelDate ? "checked" : ""} /> Show Travel Date to Customers</label><br>
    <label><input id="setCustomerVisaCountry" type="checkbox" ${cfg.showCustomerVisaCountry ? "checked" : ""} /> Show Visa/Country to Customers</label><br>
    <label><input id="setCustomerDocs" type="checkbox" ${cfg.showCustomerDocuments ? "checked" : ""} /> Show Documents to Customers</label><br><br>

    <h3>Secure Cloud Backup (Google Drive)</h3>
    <label><input id="setAutoDriveSync" type="checkbox" ${cfg.autoDriveSync ? "checked" : ""} /> Auto Backup on Save</label>
    <p id="driveStatusText" class="hint">Drive Status: ${isDriveConnected() ? "Connected" : "Not Connected"}</p>

    <button class="btn" id="saveSettingsBtn">Save Controls</button>
    <button class="btn secondary" id="openDriveBtn">Open Google Drive</button>
    <button class="btn secondary" id="openSheetsBtn">Open Google Sheets</button>
    <button class="btn secondary" id="driveConnectBtn">Connect Drive Login</button>
    <button class="btn secondary" id="driveBackupBtn">Backup All Data Now</button>
    <button class="btn secondary" id="driveRestoreBtn">Restore From Drive</button>
    <button class="btn ghost" id="driveDisconnectBtn">Disconnect Drive</button>
  `;

  setTimeout(() => {
    document.getElementById("saveSettingsBtn").onclick = () => {
      const next = {
        ...cfg,
        adminPassword: document.getElementById("setAdminPass").value || defaultSettings.adminPassword,
        staffCode: document.getElementById("setStaffCode").value || defaultSettings.staffCode,
        driveUrl: document.getElementById("setDrive").value,
        sheetsUrl: document.getElementById("setSheets").value,
        googleClientId: document.getElementById("setGoogleClientId").value.trim(),
        driveFolderName: document.getElementById("setDriveFolderName").value.trim() || "296 Group App Data",
        autoDriveSync: document.getElementById("setAutoDriveSync").checked,
        show296ForStaff: document.getElementById("set296staff").checked,
        show296ForCustomer: document.getElementById("set296customer").checked,
        showTravelNama: document.getElementById("setTravel").checked,
        showUmeed: document.getElementById("setUmeed").checked,
        showStaffEmailContact: document.getElementById("setStaffContact").checked,
        showStaffPayments: document.getElementById("setStaffPayments").checked,
        showStaffDocuments: document.getElementById("setStaffDocs").checked,
        showCustomerPaymentDetails: document.getElementById("setCustomerPayment").checked,
        showCustomerTravelDate: document.getElementById("setCustomerTravel").checked,
        showCustomerVisaCountry: document.getElementById("setCustomerVisaCountry").checked,
        showCustomerDocuments: document.getElementById("setCustomerDocs").checked,
      };
      save(APP_KEYS.settings, next);
      alert("Settings saved.");
      autoDriveBackupIfEnabled();
      renderTab();
    };
    document.getElementById("openDriveBtn").onclick = () => {
      const url = (document.getElementById("setDrive").value || "").trim();
      if (url) window.open(url, "_blank", "noopener");
    };
    document.getElementById("openSheetsBtn").onclick = () => {
      const url = (document.getElementById("setSheets").value || "").trim();
      if (url) window.open(url, "_blank", "noopener");
    };
    document.getElementById("driveConnectBtn").onclick = async () => {
      try {
        await connectGoogleDrive(true);
        await ensureDriveFolders();
        const folderUrl = `https://drive.google.com/drive/folders/${driveState.folderId}`;
        const driveInput = document.getElementById("setDrive");
        if (driveInput && !driveInput.value.trim()) driveInput.value = folderUrl;
        document.getElementById("driveStatusText").textContent = `Drive Status: Connected (${driveFolderName()})`;
        alert("Google Drive connected successfully.");
      } catch (error) {
        alert(`Drive connection failed: ${error.message}`);
      }
    };
    document.getElementById("driveBackupBtn").onclick = async () => {
      try {
        await backupAllToGoogleDrive();
        document.getElementById("driveStatusText").textContent = `Drive Status: Connected (${driveFolderName()})`;
        alert("Secure backup uploaded to Google Drive.");
      } catch (error) {
        alert(`Backup failed: ${error.message}`);
      }
    };
    document.getElementById("driveRestoreBtn").onclick = async () => {
      if (!confirm("Restore all app data from Google Drive backup? This will overwrite current local data.")) return;
      try {
        await restoreAllFromGoogleDrive();
        alert("Data restored from Google Drive backup.");
        renderTab();
      } catch (error) {
        alert(`Restore failed: ${error.message}`);
      }
    };
    document.getElementById("driveDisconnectBtn").onclick = () => {
      disconnectGoogleDrive();
      document.getElementById("driveStatusText").textContent = "Drive Status: Not Connected";
      alert("Google Drive disconnected.");
    };
  }, 0);

  return div;
}

function renderNewApplication() {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${t("newApplication")}</h3>
    <p class="hint">Use this page only when you need to add or edit an application/customer.</p>
    <button id="backToDataBankBtn" class="btn secondary">Back to Data Bank</button>
    <hr>
    ${customerFormHTML()}
  `;

  setTimeout(() => {
    const form = document.getElementById("customerForm");
    if (!form) return;
    attachPaymentAutoCalc(form);
    attachTradeCategoryBehavior(form);
    attachVisitVisaBehavior(form);
    attachOverseasDemandBehavior(form);
    attachJobDemandBehavior(form);
    attachReferenceTypeBehavior(form);
    attachInterlinkBehavior(form);

    if (state.pendingEditSerial) {
      loadCustomerIntoFormBySerial(state.pendingEditSerial, form);
      state.pendingEditSerial = null;
    }

    form.onsubmit = async (e) => {
      e.preventDefault();
      await addCustomer(form);
      state.tab = "candidates";
      renderTabs();
      renderTab();
    };

    document.getElementById("cancelEditBtn").onclick = () => {
      if (!confirm("Cancel current edit?")) return;
      resetCustomerFormMode();
    };

    document.getElementById("backToDataBankBtn").onclick = () => {
      state.pendingEditSerial = null;
      state.tab = "candidates";
      renderTabs();
      renderTab();
    };
  }, 0);

  return div;
}

function renderDatabank() {
  const role = state.user.role;
  const div = document.createElement("div");

  if (role !== "customer") {
    div.innerHTML = `<div class="notice">Data Bank shows all applicant details for Admin and Staff. Use the button below to add a new customer/application.</div>
      <button id="openNewApplicationBtn" class="btn">+ Add New Application / Customer</button>
      <hr><h3>${t("customerList")}</h3>
      <div class="grid-3">
        <select id="dbCompanyFilter" class="input">
          <option value="all">Combined Data Bank (All Companies)</option>
          <option value="travel">Travel Nama Only</option>
          <option value="umeed">Umeed e Rozgar Only</option>
          <option value="group296">296 Group Only</option>
        </select>
        <select id="dbSearchBy" class="input">
          <option value="appId">Search by Application ID</option>
          <option value="passport">Search by Passport Number</option>
          <option value="name">Search by Name</option>
          <option value="fatherName">Search by Father Name</option>
          <option value="contact">Search by Contact Number</option>
          <option value="agentGuardian">Search by Agent / Guardian</option>
          <option value="companyName">Search by Company Name</option>
          <option value="tradeCategory">Search by Trade Category</option>
          <option value="services">Search by Services</option>
        </select>
        <input id="dbSearchText" class="input" placeholder="Type search keyword..." />
      </div>
      <div class="search-chip-row">
        <button id="quickSearchAppId" class="btn small secondary" type="button">App ID</button>
        <button id="quickSearchPassport" class="btn small secondary" type="button">Passport</button>
        <button id="quickSearchName" class="btn small secondary" type="button">Name</button>
        <button id="quickSearchContact" class="btn small secondary" type="button">Contact</button>
        <button id="quickSearchAgentGuardian" class="btn small secondary" type="button">Agent/Guardian</button>
      </div>
      <button id="exportCsvBtn" class="btn secondary">Export to CSV (Google Sheets import)</button>
      <button id="clearSearchBtn" class="btn ghost">Clear Search</button>
      <div id="dbTableWrap"></div>`;

    setTimeout(() => {
      document.getElementById("openNewApplicationBtn").onclick = () => {
        state.pendingEditSerial = null;
        state.tab = "newApplication";
        renderTabs();
        renderTab();
      };
      document.getElementById("exportCsvBtn").onclick = () => {
        const list = filterCustomersData(
          customers(),
          document.getElementById("dbSearchBy").value,
          document.getElementById("dbSearchText").value,
          document.getElementById("dbCompanyFilter").value,
        );
        if (!list.length) return alert("No data to export.");
        exportCsv(list);
      };

      const renderDataTable = () => {
        const filtered = filterCustomersData(
          customers(),
          document.getElementById("dbSearchBy").value,
          document.getElementById("dbSearchText").value,
          document.getElementById("dbCompanyFilter").value,
        );
        const tableWrap = document.getElementById("dbTableWrap");
        const cfg = settings();
        const isAdmin = state.user.role === "admin";
        const isStaff = state.user.role === "staff";
        const perms = state.user.permissions || {};
        const canManageRows = isAdmin || (isStaff && !perms.canSubmitCandidatesOnly);
        tableWrap.innerHTML = `<p class="hint">Records found: ${filtered.length}</p>` + customerTable(filtered, {
          canManage: canManageRows,
          canDelete: isAdmin || !!perms.canDelete,
          showContact: isAdmin ? true : cfg.showStaffEmailContact,
          showFinancial: isAdmin ? true : cfg.showStaffPayments,
          showDocs: isAdmin ? true : cfg.showStaffDocuments,
        });
        tableWrap.querySelectorAll(".edit-customer-btn").forEach((btn) => {
          btn.onclick = () => beginCustomerEdit(btn.dataset.serial);
        });
        tableWrap.querySelectorAll(".delete-customer-btn").forEach((btn) => {
          btn.onclick = () => deleteCustomer(btn.dataset.serial);
        });
      };

      document.getElementById("dbSearchText").addEventListener("input", renderDataTable);
      document.getElementById("dbSearchBy").addEventListener("change", renderDataTable);
      document.getElementById("dbCompanyFilter").addEventListener("change", renderDataTable);
      document.getElementById("quickSearchAppId").onclick = () => { document.getElementById("dbSearchBy").value = "appId"; renderDataTable(); };
      document.getElementById("quickSearchPassport").onclick = () => { document.getElementById("dbSearchBy").value = "passport"; renderDataTable(); };
      document.getElementById("quickSearchName").onclick = () => { document.getElementById("dbSearchBy").value = "name"; renderDataTable(); };
      document.getElementById("quickSearchContact").onclick = () => { document.getElementById("dbSearchBy").value = "contact"; renderDataTable(); };
      document.getElementById("quickSearchAgentGuardian").onclick = () => { document.getElementById("dbSearchBy").value = "agentGuardian"; renderDataTable(); };
      document.getElementById("clearSearchBtn").onclick = () => {
        document.getElementById("dbCompanyFilter").value = "all";
        document.getElementById("dbSearchBy").value = "appId";
        document.getElementById("dbSearchText").value = "";
        renderDataTable();
      };
      renderDataTable();
    }, 0);
  } else {
    const cfg = settings();
    const c = customers().find((x) => x.appId === state.user.id);
    const docList = [];
    if (c.documents?.passportCopy) docList.push(`Passport: ${c.documents.passportCopy.name}`);
    if (c.documents?.idCopy) docList.push(`ID: ${c.documents.idCopy.name}`);
    if (c.documents?.medicalReport) docList.push(`Medical: ${c.documents.medicalReport.name}`);
    if (c.documents?.ticketCopy) docList.push(`Ticket: ${c.documents.ticketCopy.name}`);
    if (c.documents?.otherDocs?.length) docList.push(`Other: ${c.documents.otherDocs.map((d) => d.name).join(", ")}`);
    div.innerHTML = `<h3>${t("customerPortal")}</h3>
      <p class="badge">Application ID: ${c.appId}</p>
      <p><strong>Status:</strong> ${c.status || "-"}</p>
      <p><strong>Service Purchased:</strong> ${c.boughtService || "-"}</p>
      <p><strong>Service Detail:</strong> ${c.boughtServiceDetails || c.serviceNotes || "-"}</p>
      ${cfg.showCustomerVisaCountry ? `<p><strong>Visa Type:</strong> ${c.visaType || "-"}</p>` : ""}
      ${cfg.showCustomerVisaCountry ? `<p><strong>Country:</strong> ${c.country || "-"}</p>` : ""}
      <p><strong>Apply Date:</strong> ${c.applyDate || "-"}</p>
      ${cfg.showCustomerTravelDate ? `<p><strong>Travel Date:</strong> ${c.travelDate || "-"}</p>` : ""}
      <p><strong>Required Documents:</strong> ${c.requiredDocuments ? c.requiredDocuments.replace(/\n/g, " | ") : "-"}</p>
      ${cfg.showCustomerPaymentDetails ? `<p><strong>Remaining Payment:</strong> PKR ${(Number(c.remainingPayment || 0)).toLocaleString()}</p>` : ""}
      ${cfg.showCustomerDocuments ? `<p><strong>Documents:</strong> ${docList.length ? docList.join(" | ") : "No documents uploaded yet."}</p>` : ""}
      <p class="hint">You can only view your own record.</p>`;
  }

  return div;
}

function renderCustomerPortal() {
  return renderDatabank();
}

function renderApplications() {
  const data = customers();
  const div = document.createElement("div");
  div.innerHTML = `<h3>Applications</h3><p class="hint">Recruitment pipeline with visa stages.</p>`;

  const table = document.createElement("div");
  table.className = "table-wrap";
  table.innerHTML = `
    <table>
      <thead>
        <tr><th>App ID</th><th>Name</th><th>Passport</th><th>Company</th><th>Stage</th><th>Status</th><th>Travel Date</th><th>Action</th></tr>
      </thead>
      <tbody>
        ${data.map((c) => `
          <tr>
            <td>${c.appId}</td>
            <td>${c.name || ""}</td>
            <td>${c.passport || ""}</td>
            <td>${c.serviceCompany || c.companyName || ""}</td>
            <td>
              <select class="input app-stage" data-serial="${c.serial}">
                ${CRM_STAGE_OPTIONS.map((s) => `<option value="${s}" ${String(c.stage || "Application") === s ? "selected" : ""}>${s}</option>`).join("")}
              </select>
            </td>
            <td>
              <select class="input app-status" data-serial="${c.serial}">
                ${STATUS_OPTIONS.map((s) => `<option value="${s}" ${String(c.status || "") === s ? "selected" : ""}>${s}</option>`).join("")}
              </select>
            </td>
            <td><input class="input app-travel" type="date" data-serial="${c.serial}" value="${c.travelDate || ""}" /></td>
            <td><button class="btn small save-app-row" data-serial="${c.serial}">Save</button></td>
          </tr>`).join("")}
      </tbody>
    </table>`;

  div.appendChild(table);

  setTimeout(() => {
    div.querySelectorAll(".save-app-row").forEach((btn) => {
      btn.onclick = async () => {
        const serial = Number(btn.dataset.serial);
        const stageEl = div.querySelector(`.app-stage[data-serial="${serial}"]`);
        const statusEl = div.querySelector(`.app-status[data-serial="${serial}"]`);
        const travelEl = div.querySelector(`.app-travel[data-serial="${serial}"]`);
        const all = customers();
        const idx = all.findIndex((x) => Number(x.serial) === serial);
        if (idx < 0) return;
        all[idx].stage = stageEl.value;
        all[idx].status = statusEl.value;
        all[idx].travelDate = travelEl.value;
        save(APP_KEYS.customers, all);
        const saveResult = await saveApplicantsToServer(all);
        const n = notifications();
        n.unshift({ at: new Date().toISOString(), text: `Application updated: ${all[idx].name} (${all[idx].appId})` });
        save(APP_KEYS.notifications, n);
        alert(saveResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync");
        autoDriveBackupIfEnabled();
      };
    });
  }, 0);

  return div;
}

function renderCandidatesModule() {
  return renderDatabank();
}

function renderAgentsModule() {
  const perms = state.user.permissions || {};
  const canManage = state.user.role === "admin" || !!perms.canManageAgents;
  const div = document.createElement("div");
  const list = Array.isArray(runtimeStore.crmAgents) ? runtimeStore.crmAgents : [];
  div.innerHTML = `<h3>Agents</h3><p class="hint">Admin / Staff agent hierarchy management.</p>
    ${canManage ? `
      <form id="agentForm" class="grid-3">
        <input type="hidden" name="id" value="" />
        <input class="input" name="name" placeholder="Agent Name" required />
        <input class="input" name="email" type="email" placeholder="Agent Email" />
        <input class="input" name="phone" placeholder="Phone" />
        <select class="input" name="role">
          <option value="agent">agent</option>
          <option value="sub_agent">sub_agent</option>
          <option value="staff">staff</option>
        </select>
        <button class="btn" type="submit" id="saveAgentBtn">Save Agent</button>
        <button class="btn secondary hidden" type="button" id="cancelAgentEditBtn">Cancel Edit</button>
      </form>
    ` : `<div class="notice">You can view agents but cannot edit.</div>`}
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Agent ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th>${canManage ? "<th>Action</th>" : ""}</tr></thead>
        <tbody>${list.map((a, i) => `<tr><td>${i + 1}</td><td>${a.agent_code || a.agentCode || String(a.id || "").slice(0, 8).toUpperCase()}</td><td>${a.name || ""}</td><td>${a.email || ""}</td><td>${a.phone || ""}</td><td>${a.role || "agent"}</td>${canManage ? `<td><button class="btn small edit-agent" data-id="${a.id || ""}">Edit</button></td>` : ""}</tr>`).join("")}</tbody>
      </table>
    </div>`;
  if (canManage) {
    setTimeout(() => {
      const form = document.getElementById("agentForm");
      if (!form) return;
      const saveBtn = document.getElementById("saveAgentBtn");
      const cancelBtn = document.getElementById("cancelAgentEditBtn");
      const resetAgentForm = () => {
        form.reset();
        form.querySelector("[name=\"id\"]").value = "";
        if (saveBtn) saveBtn.textContent = "Save Agent";
        if (cancelBtn) cancelBtn.classList.add("hidden");
      };

      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
          const result = await saveAgentToSupabase(payload);
          runtimeStore.crmAgents = await fetchCrmAgents();
          resetAgentForm();
          renderTab();
          alert(result.status === "online" ? "Saved online successfully" : "Saved locally, pending sync");
        } catch (error) {
          alert(`Failed to save agent: ${error.message}`);
        }
      };

      if (cancelBtn) {
        cancelBtn.onclick = () => {
          resetAgentForm();
        };
      }

      div.querySelectorAll(".edit-agent").forEach((btn) => {
        btn.onclick = () => {
          const agentId = String(btn.dataset.id || "");
          const item = list.find((a) => String(a.id || "") === agentId);
          if (!item) return;
          form.querySelector("[name=\"id\"]").value = item.id || "";
          form.querySelector("[name=\"name\"]").value = item.name || "";
          form.querySelector("[name=\"email\"]").value = item.email || "";
          form.querySelector("[name=\"phone\"]").value = item.phone || "";
          form.querySelector("[name=\"role\"]").value = item.role || "agent";
          if (saveBtn) saveBtn.textContent = "Update Agent";
          if (cancelBtn) cancelBtn.classList.remove("hidden");
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        };
      });
    }, 0);
  }
  return div;
}

function renderJobDemandsModule() {
  const perms = state.user.permissions || {};
  const canManage = state.user.role === "admin" || !!perms.canManageJobs;
  const countries = ALL_COUNTRIES;
  const companiesFromDb = Array.isArray(runtimeStore.crmCompanies) ? runtimeStore.crmCompanies : [];
  const companies = companiesFromDb.length
    ? companiesFromDb.map((c) => c.name).filter(Boolean)
    : companyProfiles().map((c) => c.name).filter(Boolean);
  const jobs = Array.isArray(runtimeStore.crmJobs) ? runtimeStore.crmJobs : [];
  const div = document.createElement("div");
  div.innerHTML = `<h3>Job Demands</h3><p class="hint">Overseas demand management with country/job/quantity/salary.</p>
    ${canManage ? `
      <form id="jobForm" class="grid-3">
        <select class="input" name="companyName">${companies.map((name) => `<option value="${name}">${name}</option>`).join("")}</select>
        <select class="input" name="jobTitle" id="jobDemandTitleSelect">${tradeOptionsHTML()}</select>
        <input class="input hidden" name="jobTitleManual" id="jobDemandTitleManual" placeholder="Write job title manually" />
        <input class="input" name="overseasClientName" placeholder="Overseas Company / Client Name" />
        <select class="input" name="countryName">${countries.map((name, idx) => `<option value="${name}">${name}${idx < GCC_COUNTRIES.length ? " (GCC)" : ""}</option>`).join("")}</select>
        <input class="input" type="number" min="1" name="quantity" placeholder="How many persons required" value="1" />
        <input class="input" type="number" min="0" name="salary" placeholder="Salary" value="0" />
        <button class="btn" type="submit">Save Job Demand</button>
      </form>
    ` : `<div class="notice">You can view job demands only.</div>`}
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Company</th><th>Overseas Client</th><th>Job</th><th>Country</th><th>Qty</th><th>Salary</th><th>Status</th></tr></thead>
        <tbody>${jobs.map((j, i) => `<tr><td>${i + 1}</td><td>${j.company_name || ""}</td><td>${j.client_name || "-"}</td><td>${j.job_title || ""}</td><td>${j.country_name || ""}</td><td>${j.quantity || 0}</td><td>${Number(j.salary || 0).toLocaleString()}</td><td>${j.status || "open"}</td></tr>`).join("")}</tbody>
      </table>
    </div>`;
  if (canManage) {
    setTimeout(() => {
      const form = document.getElementById("jobForm");
      if (!form) return;
      const titleSelect = document.getElementById("jobDemandTitleSelect");
      const titleManual = document.getElementById("jobDemandTitleManual");
      const syncTitleMode = () => {
        const isOther = String(titleSelect.value || "") === "Other";
        titleManual.classList.toggle("hidden", !isOther);
        titleManual.required = isOther;
        if (!isOther) titleManual.value = "";
      };
      titleSelect.onchange = syncTitleMode;
      syncTitleMode();
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        if (payload.jobTitle === "Other" && payload.jobTitleManual) {
          payload.jobTitle = payload.jobTitleManual;
        }
        try {
          await crmFetch("/crm-jobs", {
            method: "POST",
            body: JSON.stringify({ job: payload }),
          });
          runtimeStore.crmJobs = await fetchCrmJobs();
          renderTab();
        } catch (error) {
          const current = Array.isArray(runtimeStore.crmJobs) ? [...runtimeStore.crmJobs] : [];
          const localId = payload.id || `local_job_${Date.now()}_${Math.random().toString(16).slice(2, 7)}`;
          const localJob = {
            id: localId,
            company_name: payload.companyName || "",
            client_name: payload.overseasClientName || "",
            job_title: payload.jobTitle || "General Worker",
            country_name: payload.countryName || "",
            quantity: Math.max(1, Number(payload.quantity || 1)),
            salary: Math.max(0, Number(payload.salary || 0)),
            status: payload.status || "open",
            created_at: new Date().toISOString(),
            local_only: true,
          };
          runtimeStore.crmJobs = [localJob, ...current.filter((job) => String(job.id || "") !== String(localId))];
          renderTab();
          alert(`Job demand saved locally (server unavailable): ${error.message}`);
        }
      };
    }, 0);
  }
  return div;
}

function renderDocumentsModule() {
  const perms = state.user.permissions || {};
  const canManage = state.user.role === "admin" || !!perms.canManageDocuments;
  const docs = Array.isArray(runtimeStore.crmDocuments) ? runtimeStore.crmDocuments : [];
  const div = document.createElement("div");
  div.innerHTML = `<h3>Documents</h3><p class="hint">CV, Passport, ID Card, Visa Copy URLs are stored in database.</p>
    ${canManage ? `
      <form id="docForm" class="grid-3">
        <input class="input" name="applicationId" placeholder="Application ID (e.g., UR-05032026-0001)" required />
        <select class="input" name="documentType">
          <option value="cv">CV</option>
          <option value="passportCopy">Passport</option>
          <option value="idCopy">ID Card</option>
          <option value="visaCopy">Visa Copy</option>
        </select>
        <input class="input" name="documentUrl" placeholder="Document URL (Supabase/R2 link)" required />
        <button class="btn" type="submit">Save Document URL</button>
      </form>
    ` : `<div class="notice">You can view documents only.</div>`}
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Application</th><th>Candidate</th><th>Type</th><th>URL</th><th>Uploaded</th></tr></thead>
        <tbody>${docs.map((d, i) => `<tr><td>${i + 1}</td><td>${d.application_id || ""}</td><td>${d.candidate_name || ""}</td><td>${d.document_type || ""}</td><td><a href="${d.document_url || "#"}" target="_blank" rel="noopener">Open</a></td><td>${d.uploaded_at ? new Date(d.uploaded_at).toLocaleString() : ""}</td></tr>`).join("")}</tbody>
      </table>
    </div>`;
  if (canManage) {
    setTimeout(() => {
      const form = document.getElementById("docForm");
      if (!form) return;
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
          await crmFetch("/crm-documents", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          runtimeStore.crmDocuments = await fetchCrmDocuments();
          renderTab();
        } catch (error) {
          alert(`Failed to save document: ${error.message}`);
        }
      };
    }, 0);
  }
  return div;
}

function renderPaymentsModule() {
  const perms = state.user.permissions || {};
  const canManage = state.user.role === "admin" || !!perms.canManagePayments;
  const payments = Array.isArray(runtimeStore.crmPayments) ? runtimeStore.crmPayments : [];
  const div = document.createElement("div");
  div.innerHTML = `<h3>Payments</h3><p class="hint">Track recruitment payments and refunds.</p>
    ${canManage ? `
      <form id="payForm" class="grid-3">
        <input class="input" name="applicationId" placeholder="Application ID" required />
        <input class="input" name="amount" type="number" min="0" value="0" placeholder="Amount" />
        <select class="input" name="paymentType">
          <option value="service_fee">service_fee</option>
          <option value="advance">advance</option>
          <option value="refund">refund</option>
        </select>
        <select class="input" name="status">
          <option value="recorded">recorded</option>
          <option value="pending">pending</option>
          <option value="received">received</option>
        </select>
        <input class="input" name="paymentDate" type="date" />
        <button class="btn" type="submit">Save Payment</button>
      </form>
    ` : `<div class="notice">You can view payments only.</div>`}
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Application</th><th>Candidate</th><th>Type</th><th>Status</th><th>Amount</th><th>Date</th></tr></thead>
        <tbody>${payments.map((p, i) => `<tr><td>${i + 1}</td><td>${p.application_id || ""}</td><td>${p.candidate_name || ""}</td><td>${p.payment_type || ""}</td><td>${p.status || ""}</td><td>PKR ${Number(p.amount || 0).toLocaleString()}</td><td>${p.payment_date || ""}</td></tr>`).join("")}</tbody>
      </table>
    </div>`;
  if (canManage) {
    setTimeout(() => {
      const form = document.getElementById("payForm");
      if (!form) return;
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
          await crmFetch("/crm-payments", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          runtimeStore.crmPayments = await fetchCrmPayments();
          renderTab();
        } catch (error) {
          alert(`Failed to save payment: ${error.message}`);
        }
      };
    }, 0);
  }
  return div;
}

function renderStaffManagement() {
  const isAdmin = state.user?.role === "admin";
  const div = document.createElement("div");
  const list = staffMembers();
  if (!isAdmin) {
    div.innerHTML = `
      <h3>Staff Directory (View Only)</h3>
      <div class="notice">Only Admin can add, edit, or delete staff records.</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Permissions</th></tr></thead>
          <tbody>
            ${list.map((s, i) => {
              const p = staffRolePermissions(s.role);
              const info = [
                p.canReports ? "reports" : "",
                p.canEdit ? "edit" : "",
                p.canDelete ? "delete" : "",
                p.canFinancialEdit ? "financial" : "",
              ].filter(Boolean).join(", ");
              return `<tr><td>${i + 1}</td><td>${s.name || ""}</td><td>${s.email || ""}</td><td>${s.phone || ""}</td><td>${s.role || "staff"}</td><td>${info || "-"}</td></tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>`;
    return div;
  }

  div.innerHTML = `
    <h3>Staff Management</h3>
    <form id="staffForm" class="grid-3">
      <input type="hidden" name="editIndex" value="" />
      <input class="input" name="name" placeholder="Staff Name" required />
      <input class="input" name="email" type="email" placeholder="Staff Email" required />
      <input class="input" name="phone" placeholder="Phone" />
      <select class="input" name="role">
        <option value="admin">admin</option>
        <option value="manager">manager</option>
        <option value="counselor">counselor</option>
        <option value="operations">operations</option>
        <option value="accounts">accounts</option>
        <option value="data_entry">data_entry</option>
        <option value="agent">agent</option>
        <option value="sub_agent">sub_agent</option>
        <option value="staff">staff</option>
      </select>
      <button class="btn" type="submit" id="saveStaffBtn">Add Staff</button>
      <button class="btn secondary hidden" type="button" id="cancelStaffEditBtn">Cancel Edit</button>
    </form>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Permissions</th><th>Action</th></tr></thead>
        <tbody>
          ${list.map((s, i) => {
            const p = staffRolePermissions(s.role);
            const info = [
              p.canReports ? "reports" : "",
              p.canEdit ? "edit" : "",
              p.canDelete ? "delete" : "",
              p.canFinancialEdit ? "financial" : "",
            ].filter(Boolean).join(", ");
            return `<tr><td>${i + 1}</td><td>${s.name || ""}</td><td>${s.email || ""}</td><td>${s.phone || ""}</td><td>${s.role || "staff"}</td><td>${info || "-"}</td><td><button class="btn small edit-staff" data-idx="${i}">Edit</button> <button class="btn small ghost del-staff" data-idx="${i}">Delete</button></td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;

  setTimeout(() => {
    const form = document.getElementById("staffForm");
    const saveBtn = document.getElementById("saveStaffBtn");
    const cancelBtn = document.getElementById("cancelStaffEditBtn");
    const resetStaffForm = () => {
      form.reset();
      form.querySelector("[name=\"editIndex\"]").value = "";
      saveBtn.textContent = "Add Staff";
      cancelBtn.classList.add("hidden");
    };

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const obj = Object.fromEntries(fd.entries());
        const editIndex = obj.editIndex === "" ? -1 : Number(obj.editIndex);
        delete obj.editIndex;
        const all = staffMembers();
        if (editIndex >= 0 && all[editIndex]) {
          all[editIndex] = obj;
        } else {
          all.push(obj);
        }
        save(APP_KEYS.staff, all);
        alert(editIndex >= 0 ? "Staff updated." : "Staff added.");
        autoDriveBackupIfEnabled();
        resetStaffForm();
        renderTab();
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        if (!confirm("Cancel staff edit?")) return;
        resetStaffForm();
      };
    }

    div.querySelectorAll(".edit-staff").forEach((btn) => {
      btn.onclick = () => {
        if (state.user?.role !== "admin") {
          alert("Only Admin can edit staff.");
          return;
        }
        const idx = Number(btn.dataset.idx);
        const all = staffMembers();
        const item = all[idx];
        if (!item) return;
        if (!confirm(`Edit staff ${item.name || item.email || `#${idx + 1}`}?`)) return;
        form.querySelector("[name=\"editIndex\"]").value = String(idx);
        form.querySelector("[name=\"name\"]").value = item.name || "";
        form.querySelector("[name=\"email\"]").value = item.email || "";
        form.querySelector("[name=\"phone\"]").value = item.phone || "";
        form.querySelector("[name=\"role\"]").value = item.role || "staff";
        saveBtn.textContent = "Update Staff";
        cancelBtn.classList.remove("hidden");
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });

    div.querySelectorAll(".del-staff").forEach((btn) => {
      btn.onclick = () => {
        if (state.user?.role !== "admin") {
          alert("Only Admin can delete staff.");
          return;
        }
        if (!confirm("Delete this staff member?")) return;
        const idx = Number(btn.dataset.idx);
        const all = staffMembers();
        all.splice(idx, 1);
        save(APP_KEYS.staff, all);
        autoDriveBackupIfEnabled();
        renderTab();
      };
    });
  }, 0);

  return div;
}

function renderServiceCatalog() {
  const div = document.createElement("div");
  const profiles = companyProfiles();
  const companyOptions = profiles.map((c) => `<option value="${c.key}">${c.name}</option>`).join("");
  const socialCompanyOptions = `<option value="all">All Companies</option>${companyOptions}`;
  const serviceRows = profiles.flatMap((c) => (c.services || []).map((s, i) => ({
    companyKey: c.key,
    companyName: c.name,
    idx: i,
    name: s.name,
    photo: s.photo || "",
    details: s.details || "",
  })));
  const socialRows = socialLinks();
  div.innerHTML = `
    <h3>Company Profiles & Services</h3>
    <p class="hint">Admin and Staff can update company profile photo/details and manage company services.</p>

    <h3>Update Company Profile</h3>
    <form id="companyProfileForm" class="grid-2">
      <select class="input" name="companyKey">${companyOptions}</select>
      <input class="input" name="companyName" placeholder="Company Name" required />
      <input class="input" name="companyPhone" placeholder="Company Phone" />
      <input class="input" name="companyImage" placeholder="Profile Photo URL" />
      <div><label>Upload Profile Photo</label><input class="input" name="companyImageFile" type="file" accept="image/*" /></div>
      <textarea class="input" name="companyDescription" placeholder="Company Description"></textarea>
      <button class="btn" type="submit">Save Company Profile</button>
    </form>

    <h3>Manage Services</h3>
    <form id="serviceCatalogForm" class="grid-3">
      <input type="hidden" name="editServiceCompanyKey" value="" />
      <input type="hidden" name="editServiceIndex" value="" />
      <select class="input" name="companyKey">${companyOptions}</select>
      <input class="input" name="name" placeholder="Service Name" required />
      <input class="input" name="photo" placeholder="Service Photo URL" />
      <div><label>Upload Service Photo</label><input class="input" name="servicePhotoFile" type="file" accept="image/*" /></div>
      <textarea class="input" name="details" placeholder="Service details / description"></textarea>
      <button class="btn" type="submit" id="saveServiceBtn">Add Service</button>
      <button class="btn secondary hidden" type="button" id="cancelServiceEditBtn">Cancel Edit</button>
    </form>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Service</th><th>Company</th><th>Details</th><th>Photo</th><th>Action</th></tr></thead>
        <tbody>
          ${serviceRows.map((s, i) => `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.companyName}</td><td>${s.details || "-"}</td><td>${s.photo ? "Yes" : "-"}</td><td><button class="btn small edit-service" data-company="${s.companyKey}" data-idx="${s.idx}">Edit</button> <button class="btn small ghost del-service" data-company="${s.companyKey}" data-idx="${s.idx}">Delete</button></td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <h3>Social Media Options (Follow & Join)</h3>
    <form id="socialLinkForm" class="grid-3">
      <input type="hidden" name="editSocialId" value="" />
      <select class="input" name="companyKey">${socialCompanyOptions}</select>
      <select class="input" name="platform">
        <option value="Facebook">Facebook</option>
        <option value="Instagram">Instagram</option>
        <option value="TikTok">TikTok</option>
        <option value="YouTube">YouTube</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="X">X</option>
        <option value="Telegram">Telegram</option>
        <option value="WhatsApp Channel">WhatsApp Channel</option>
      </select>
      <input class="input" name="label" placeholder="Button Text (e.g., Follow on Facebook)" />
      <input class="input" name="url" placeholder="https://..." required />
      <button class="btn" type="submit" id="saveSocialBtn">Add Social Link</button>
      <button class="btn secondary hidden" type="button" id="cancelSocialEditBtn">Cancel Edit</button>
    </form>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Company</th><th>Platform</th><th>Label</th><th>URL</th><th>Action</th></tr></thead>
        <tbody>
          ${socialRows.map((s, i) => {
            const companyName = s.companyKey === "all"
              ? "All Companies"
              : (profiles.find((p) => p.key === s.companyKey)?.name || s.companyKey);
            return `<tr><td>${i + 1}</td><td>${companyName}</td><td>${s.platform}</td><td>${s.label || "-"}</td><td>${s.url}</td><td><button class="btn small edit-social" data-id="${s.id}">Edit</button> <button class="btn small ghost del-social" data-id="${s.id}">Delete</button></td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;

  setTimeout(() => {
    const profileForm = document.getElementById("companyProfileForm");
    const profileSelect = profileForm.querySelector("[name=\"companyKey\"]");
    const fillProfile = () => {
      const key = profileSelect.value;
      const p = companyProfiles().find((x) => x.key === key);
      if (!p) return;
      profileForm.querySelector("[name=\"companyName\"]").value = p.name || "";
      profileForm.querySelector("[name=\"companyPhone\"]").value = p.phone || "";
      profileForm.querySelector("[name=\"companyImage\"]").value = p.image || "";
      profileForm.querySelector("[name=\"companyDescription\"]").value = p.description || "";
    };
    profileSelect.onchange = fillProfile;
    fillProfile();

    profileForm.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(profileForm);
      const obj = Object.fromEntries(fd.entries());
      const all = companyProfiles();
      const idx = all.findIndex((x) => x.key === obj.companyKey);
      if (idx < 0) return;
      const file = profileForm.querySelector("[name=\"companyImageFile\"]")?.files?.[0];
      const fileImage = file ? await fileToDataUrl(file) : "";
      all[idx].name = String(obj.companyName || "").trim();
      all[idx].phone = String(obj.companyPhone || "").trim();
      all[idx].image = fileImage || String(obj.companyImage || "").trim();
      all[idx].description = String(obj.companyDescription || "").trim();
      saveCompanyProfiles(all);
      syncServicesCatalogFromProfiles(all);
      const companyResult = await saveCompaniesToSupabase(all);
      alert(companyResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync");
      autoDriveBackupIfEnabled();
      renderTab();
    };

    const form = document.getElementById("serviceCatalogForm");
    const saveServiceBtn = document.getElementById("saveServiceBtn");
    const cancelServiceEditBtn = document.getElementById("cancelServiceEditBtn");
    const resetServiceForm = () => {
      form.reset();
      form.querySelector("[name=\"editServiceCompanyKey\"]").value = "";
      form.querySelector("[name=\"editServiceIndex\"]").value = "";
      saveServiceBtn.textContent = "Add Service";
      cancelServiceEditBtn.classList.add("hidden");
    };

    form.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const obj = Object.fromEntries(fd.entries());
      const all = companyProfiles();
      const editCompanyKey = String(obj.editServiceCompanyKey || "");
      const editServiceIndex = obj.editServiceIndex === "" ? -1 : Number(obj.editServiceIndex);
      const targetCompanyKey = editCompanyKey || String(obj.companyKey || "");
      const idx = all.findIndex((x) => x.key === targetCompanyKey);
      if (idx < 0) return;
      if (!Array.isArray(all[idx].services)) all[idx].services = [];
      const file = form.querySelector("[name=\"servicePhotoFile\"]")?.files?.[0];
      const fileImage = file ? await fileToDataUrl(file) : "";
      const nextService = {
        name: String(obj.name || "").trim(),
        photo: fileImage || String(obj.photo || "").trim(),
        details: String(obj.details || "").trim(),
      };
      if (editServiceIndex >= 0 && editCompanyKey) {
        const oldCompany = all.find((x) => x.key === editCompanyKey);
        if (!oldCompany || !Array.isArray(oldCompany.services) || !oldCompany.services[editServiceIndex]) return;
        const existing = oldCompany.services[editServiceIndex];
        const merged = {
          ...existing,
          ...nextService,
          photo: nextService.photo || existing.photo || "",
        };
        if (editCompanyKey === targetCompanyKey) {
          oldCompany.services[editServiceIndex] = merged;
        } else {
          oldCompany.services.splice(editServiceIndex, 1);
          all[idx].services.push(merged);
        }
      } else {
        all[idx].services.push(nextService);
      }
      saveCompanyProfiles(all);
      syncServicesCatalogFromProfiles(all);
      alert(editServiceIndex >= 0 ? "Service updated." : "Service added.");
      autoDriveBackupIfEnabled();
      resetServiceForm();
      renderTab();
    };
    cancelServiceEditBtn.onclick = () => {
      resetServiceForm();
    };
    div.querySelectorAll(".edit-service").forEach((btn) => {
      btn.onclick = () => {
        const companyKey = btn.dataset.company;
        const idx = Number(btn.dataset.idx);
        const all = companyProfiles();
        const company = all.find((x) => x.key === companyKey);
        const service = company?.services?.[idx];
        if (!service) return;
        form.querySelector("[name=\"editServiceCompanyKey\"]").value = companyKey;
        form.querySelector("[name=\"editServiceIndex\"]").value = String(idx);
        form.querySelector("[name=\"companyKey\"]").value = companyKey;
        form.querySelector("[name=\"name\"]").value = service.name || "";
        form.querySelector("[name=\"photo\"]").value = service.photo || "";
        form.querySelector("[name=\"details\"]").value = service.details || "";
        saveServiceBtn.textContent = "Update Service";
        cancelServiceEditBtn.classList.remove("hidden");
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });
    div.querySelectorAll(".del-service").forEach((btn) => {
      btn.onclick = () => {
        if (!confirm("Delete this service?")) return;
        const idx = Number(btn.dataset.idx);
        const companyKey = btn.dataset.company;
        const all = companyProfiles();
        const company = all.find((x) => x.key === companyKey);
        if (!company || !Array.isArray(company.services)) return;
        company.services.splice(idx, 1);
        saveCompanyProfiles(all);
        syncServicesCatalogFromProfiles(all);
        autoDriveBackupIfEnabled();
        renderTab();
      };
    });

    const socialForm = document.getElementById("socialLinkForm");
    const saveSocialBtn = document.getElementById("saveSocialBtn");
    const cancelSocialEditBtn = document.getElementById("cancelSocialEditBtn");
    const resetSocialForm = () => {
      socialForm.reset();
      socialForm.querySelector("[name=\"editSocialId\"]").value = "";
      saveSocialBtn.textContent = "Add Social Link";
      cancelSocialEditBtn.classList.add("hidden");
    };

    socialForm.onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(socialForm);
      const obj = Object.fromEntries(fd.entries());
      const editId = String(obj.editSocialId || "");
      const all = socialLinks();
      const nextItem = {
        id: editId || `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
        companyKey: String(obj.companyKey || "all").trim(),
        platform: String(obj.platform || "").trim(),
        label: String(obj.label || "").trim(),
        url: normalizeUrl(obj.url),
      };
      if (!nextItem.platform || !nextItem.url) return;
      const idx = all.findIndex((x) => x.id === editId);
      if (idx >= 0) all[idx] = nextItem;
      else all.push(nextItem);
      saveSocialLinks(all);
      alert(idx >= 0 ? "Social media link updated." : "Social media link added.");
      autoDriveBackupIfEnabled();
      resetSocialForm();
      renderTab();
    };

    cancelSocialEditBtn.onclick = () => {
      resetSocialForm();
    };

    div.querySelectorAll(".edit-social").forEach((btn) => {
      btn.onclick = () => {
        const id = String(btn.dataset.id || "");
        const item = socialLinks().find((x) => x.id === id);
        if (!item) return;
        socialForm.querySelector("[name=\"editSocialId\"]").value = item.id || "";
        socialForm.querySelector("[name=\"companyKey\"]").value = item.companyKey || "all";
        socialForm.querySelector("[name=\"platform\"]").value = item.platform || "Facebook";
        socialForm.querySelector("[name=\"label\"]").value = item.label || "";
        socialForm.querySelector("[name=\"url\"]").value = item.url || "";
        saveSocialBtn.textContent = "Update Social Link";
        cancelSocialEditBtn.classList.remove("hidden");
        socialForm.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });

    div.querySelectorAll(".del-social").forEach((btn) => {
      btn.onclick = () => {
        if (!confirm("Delete this social media link?")) return;
        const id = String(btn.dataset.id || "");
        const all = socialLinks().filter((x) => x.id !== id);
        saveSocialLinks(all);
        autoDriveBackupIfEnabled();
        renderTab();
      };
    });
  }, 0);

  return div;
}

function renderTrackApplication() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="notice compact-track-card">
    <h3>Track Application</h3>
    <p class="hint">Tracking is available only with your unique Application ID provided by the agency.</p>
    <div class="track-inline">
      <input id="trackValue" class="input" placeholder="Enter Application ID (e.g., TN-05032026-0001)" />
      <button id="trackBtn" class="btn mini-icon-btn icon-search"><span class="mini-icon">SR</span><span>Search</span></button>
    </div>
    <div id="trackResult"></div>
    </div>`;

  setTimeout(() => {
    document.getElementById("trackBtn").onclick = () => {
      const value = document.getElementById("trackValue").value.trim().toLowerCase();
      const c = customers().find((x) => String(x.appId || "").toLowerCase() === value);
      const out = document.getElementById("trackResult");
      if (!c) {
        out.innerHTML = `<p class="hint">No application found for this Application ID.</p>`;
        return;
      }
      out.innerHTML = `<div class="notice"><p><strong>Name:</strong> ${c.name || ""}</p><p><strong>Application ID:</strong> ${c.appId}</p><p><strong>Status:</strong> ${c.status || "-"}</p><p><strong>Visa:</strong> ${c.visaType || "-"}</p><p><strong>Country:</strong> ${c.country || "-"}</p><p><strong>Travel Date:</strong> ${c.travelDate || "-"}</p></div>`;
    };
  }, 0);

  return div;
}

function renderApplyNow() {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Apply Now</h3>
    <form id="quickApplyForm" class="grid-2">
      <input class="input" name="name" placeholder="Full Name" required />
      <input class="input" name="passport" placeholder="Passport Number" required />
      <input class="input" name="email" type="email" placeholder="Email" />
      <input class="input" name="contact" placeholder="Contact Number" />
      <select class="input" name="country">
        <option value="">Country for Visa</option>
        ${countryOptionsHTML()}
      </select>
      <select class="input" name="serviceCompany"><option>Travel Nama</option><option>Umeed e Rozgar</option></select>
      <select class="input" name="boughtService">
        <option value="">Select Service</option>
        ${serviceOptionsHTML()}
      </select>
      <select class="input" name="visaType" id="quickVisaType">${visaTypeOptionsHTML()}</select>
      <select class="input hidden" name="visitVisaType" id="quickVisitVisaType">
        <option value="">Visit Visa Type</option>
        ${visitVisaTypeOptionsHTML()}
      </select>
      <textarea class="input hidden" name="visitRequiredDocs" id="quickVisitDocs" readonly placeholder="Required documents for selected visit visa"></textarea>
      <textarea class="input" name="requiredDocuments" id="quickRequiredDocs" readonly placeholder="Required documents for selected visa/service"></textarea>
      <select class="input" name="overseasDemandType">
        ${overseasDemandOptionsHTML()}
      </select>
      <button class="btn" type="submit">Submit Application</button>
    </form>`;

  setTimeout(() => {
    const form = document.getElementById("quickApplyForm");
    const visaEl = document.getElementById("quickVisaType");
    const visitTypeEl = document.getElementById("quickVisitVisaType");
    const docsEl = document.getElementById("quickVisitDocs");
    const requiredEl = document.getElementById("quickRequiredDocs");
    const countryEl = form.querySelector("[name=\"country\"]");
    const serviceEl = form.querySelector("[name=\"serviceCompany\"]");
    const boughtServiceEl = form.querySelector("[name=\"boughtService\"]");
    const syncQuickServiceOptions = () => {
      if (!boughtServiceEl) return;
      const prev = boughtServiceEl.value || "";
      boughtServiceEl.innerHTML = `<option value="">Select Service</option>${serviceOptionsHTML(serviceEl?.value || "")}`;
      if (prev) boughtServiceEl.value = prev;
    };
    syncQuickServiceOptions();
    const syncVisit = () => {
      const isVisit = isVisitVisaType(visaEl.value || "");
      if (isVisit && !visitTypeEl.value) {
        const sub = visaSubTypeFromType(visaEl.value || "", "Visit");
        if (sub) visitTypeEl.value = sub;
      }
      visitTypeEl.classList.toggle("hidden", !isVisit);
      docsEl.classList.toggle("hidden", !isVisit);
      if (!isVisit) {
        visitTypeEl.value = "";
        docsEl.value = "";
      } else {
        docsEl.value = visitRequiredDocsText(countryEl.value || "", visitTypeEl.value || "");
      }
      if (requiredEl) {
        requiredEl.value = requiredDocsForSelection({
          visaType: visaEl.value || "",
          country: countryEl.value || "",
          visitVisaType: visitTypeEl.value || "",
          boughtService: boughtServiceEl?.value || "",
          tradeCategory: "",
          jobDemandTitle: "",
        });
      }
    };
    visaEl.onchange = syncVisit;
    visitTypeEl.onchange = syncVisit;
    countryEl.onchange = syncVisit;
    if (serviceEl) {
      serviceEl.onchange = () => {
        syncQuickServiceOptions();
        syncVisit();
      };
    }
    if (boughtServiceEl) boughtServiceEl.onchange = syncVisit;
    syncVisit();

    form.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const obj = Object.fromEntries(fd.entries());
      if (!isVisitVisaType(obj.visaType)) {
        obj.visitVisaType = "";
        obj.visitRequiredDocs = "";
      } else if (!obj.visitRequiredDocs) {
        if (!obj.visitVisaType) obj.visitVisaType = visaSubTypeFromType(obj.visaType, "Visit");
        obj.visitRequiredDocs = visitRequiredDocsText(obj.country || "", obj.visitVisaType || "");
      }
      obj.requiredDocuments = requiredDocsForSelection({
        visaType: obj.visaType || "",
        country: obj.country || "",
        visitVisaType: obj.visitVisaType || "",
        boughtService: obj.boughtService || "",
        tradeCategory: "",
        jobDemandTitle: "",
      });
      obj.appId = createApplicationId(obj.serviceCompany || obj.companyName, new Date());
      obj.serial = customers().length + 1;
      obj.status = "Applied";
      obj.stage = "Application";
      obj.createdAt = new Date().toISOString();
      obj.totalPayment = 0;
      obj.advancePayment = 0;
      obj.refundPayment = 0;
      obj.remainingPayment = 0;
      obj.boughtService = obj.boughtService || "";
      await ensureServerDriveFolder(obj.appId);
      const all = customers();
      all.push(obj);
      save(APP_KEYS.customers, all);
      const saveResult = await saveApplicantsToServer(all);
      const n = notifications();
      n.unshift({ at: new Date().toISOString(), text: `New apply-now request: ${obj.name} (${obj.appId})` });
      save(APP_KEYS.notifications, n);
      autoDriveBackupIfEnabled();
      alert(`${saveResult.status === "online" ? "Saved online successfully" : "Saved locally, pending sync"}. Application ID: ${obj.appId}`);
      form.reset();
    };
  }, 0);

  return div;
}

function humanizeFieldName(name) {
  return String(name || "Field")
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function fieldLabelFromControl(control) {
  const explicit = control.getAttribute("data-label");
  if (explicit) return explicit;
  const placeholder = (control.getAttribute("placeholder") || "").trim();
  if (placeholder) return placeholder.replace(/\s*\(.*?\)\s*/g, "").trim();
  if (control.tagName === "SELECT") {
    const first = control.querySelector("option[value='']") || control.options[0];
    const txt = String(first?.textContent || "").trim();
    if (txt && !/^select\b/i.test(txt)) return txt;
  }
  return humanizeFieldName(control.name || control.id || "Field");
}

function decorateFormFields(root) {
  if (!root) return;
  const controls = root.querySelectorAll("form input, form select, form textarea");
  controls.forEach((control) => {
    const type = String(control.type || "").toLowerCase();
    if (type === "hidden" || type === "submit" || type === "button" || type === "reset") return;
    if (control.dataset.labeled === "1") return;
    if (control.parentElement?.tagName?.toLowerCase() === "label") {
      control.dataset.labeled = "1";
      return;
    }
    const prev = control.previousElementSibling;
    if (prev && prev.tagName.toLowerCase() === "label") {
      control.dataset.labeled = "1";
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "form-field";
    const label = document.createElement("label");
    label.className = "field-label";
    if (!control.id) {
      control.id = `fld_${Math.random().toString(16).slice(2, 10)}`;
    }
    label.setAttribute("for", control.id);
    label.textContent = fieldLabelFromControl(control);

    control.parentNode.insertBefore(wrapper, control);
    wrapper.appendChild(label);
    wrapper.appendChild(control);
    control.dataset.labeled = "1";
  });
}

function enhancePasswordInputs(root) {
  if (!root) return;
  const inputs = root.querySelectorAll("input[type='password'], input[data-password-toggle='1']");
  inputs.forEach((input) => {
    if (input.dataset.passwordEnhanced === "1") return;
    const parent = input.parentNode;
    if (!parent) return;

    const wrap = document.createElement("div");
    wrap.className = "password-wrap";
    parent.insertBefore(wrap, input);
    wrap.appendChild(input);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn ghost small password-toggle";
    wrap.appendChild(btn);

    const sync = () => {
      const visible = input.type === "text";
      btn.textContent = visible ? "Hide" : "Show";
      btn.setAttribute("aria-label", visible ? "Hide password" : "Show password");
    };

    btn.onclick = () => {
      input.type = input.type === "password" ? "text" : "password";
      sync();
    };

    input.dataset.passwordEnhanced = "1";
    input.dataset.passwordToggle = "1";
    sync();
  });
}

function renderTab() {
  const role = state.user.role;
  refs.panelContent.innerHTML = "";

  if (state.tab === "dashboard") refs.panelContent.appendChild(renderDashboard());
  if (state.tab === "companies") refs.panelContent.appendChild(renderCompanies());
  if (state.tab === "databank" || state.tab === "candidates") refs.panelContent.appendChild(renderCandidatesModule());
  if (state.tab === "agents" && role !== "customer") refs.panelContent.appendChild(renderAgentsModule());
  if (state.tab === "newApplication" && role !== "customer") refs.panelContent.appendChild(renderNewApplication());
  if (state.tab === "applications" && role !== "customer") refs.panelContent.appendChild(renderApplications());
  if (state.tab === "jobDemands" && role !== "customer") refs.panelContent.appendChild(renderJobDemandsModule());
  if (state.tab === "documents" && role !== "customer") refs.panelContent.appendChild(renderDocumentsModule());
  if (state.tab === "payments" && role !== "customer") refs.panelContent.appendChild(renderPaymentsModule());
  if (state.tab === "serviceCatalog" && role !== "customer") refs.panelContent.appendChild(renderServiceCatalog());
  if (state.tab === "reports" && (role === "admin" || (role === "staff" && state.user.permissions?.canReports))) refs.panelContent.appendChild(renderReports());
  if (state.tab === "staffManagement" && role !== "customer") refs.panelContent.appendChild(renderStaffManagement());
  if (state.tab === "settings" && role === "admin") refs.panelContent.appendChild(renderSettings());
  if (state.tab === "notifications" && role !== "customer") refs.panelContent.appendChild(renderNotifications());
  if (state.tab === "trackApplication" && role === "customer") refs.panelContent.appendChild(renderTrackApplication());
  if (state.tab === "applyNow" && role === "customer") refs.panelContent.appendChild(renderApplyNow());
  decorateFormFields(refs.panelContent);
  enhancePasswordInputs(refs.panelContent);
}

refs.roleSelect.addEventListener("change", setRoleInputs);
refs.loginBtn.addEventListener("click", login);
refs.logoutBtn.addEventListener("click", logout);
refs.langToggle.addEventListener("click", () => {
  state.lang = state.lang === "en" ? "ur" : "en";
  persistSessionState();
  applyLang();
  if (state.user) {
    renderTabs();
    renderTab();
  } else {
    renderPublicHome();
  }
});

async function initializeRuntimeData() {
  runtimeStore[APP_KEYS.settings] = { ...defaultSettings, ...safeStorageGet(APP_KEYS.settings, {}) };
  runtimeStore[APP_KEYS.notifications] = safeStorageGet(APP_KEYS.notifications, []);
  runtimeStore[APP_KEYS.customTrades] = safeStorageGet(APP_KEYS.customTrades, []);
  runtimeStore[APP_KEYS.staff] = safeStorageGet(APP_KEYS.staff, []);
  runtimeStore[APP_KEYS.services] = safeStorageGet(APP_KEYS.services, defaultServicesCatalog());
  runtimeStore[APP_KEYS.companyProfiles] = safeStorageGet(APP_KEYS.companyProfiles, defaultCompanyProfiles());
  runtimeStore[APP_KEYS.socialLinks] = safeStorageGet(APP_KEYS.socialLinks, []);
  runtimeStore[APP_KEYS.customers] = await fetchApplicantsFromServer();
  const crmRefs = await fetchCrmReferences();
  runtimeStore.crmCountries = crmRefs.countries;
  runtimeStore.crmCompanies = crmRefs.companies;
  if (runtimeStore.crmCompanies.length) {
    runtimeStore[APP_KEYS.companyProfiles] = mergeCompanyProfilesWithRemote(runtimeStore.crmCompanies);
  }
  runtimeStore.crmAgents = await fetchCrmAgents();
  runtimeStore.crmJobs = await fetchCrmJobs();
  runtimeStore.crmDocuments = await fetchCrmDocuments();
  runtimeStore.crmPayments = await fetchCrmPayments();
  runtimeStore.crmReports = await fetchCrmReports();
  await syncPendingSupabaseData();
}

async function bootApp() {
  await initializeRuntimeData();
  const restored = restoreSessionFromStorage();
  applyLang();
  if (restored && state.user) {
    refs.roleSelect.value = state.user.role;
    setRoleInputs();
    refs.loginCard.classList.add("hidden");
    refs.publicHome.classList.add("hidden");
    refs.appPanel.classList.remove("hidden");
    refs.logoutBtn.classList.remove("hidden");
    startSessionGuards();
    renderTabs();
    renderTab();
    return;
  }
  setRoleInputs();
  renderPublicHome();
  decorateFormFields(refs.loginCard);
  enhancePasswordInputs(refs.loginCard);
}

window.addEventListener("online", () => {
  syncPendingSupabaseData().catch(() => {});
});

bootApp();

function isIosDevice() {
  const ua = window.navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua);
}

function isStandaloneDisplay() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function showInstallUi(showCard = true) {
  refs.installBtn?.classList.remove("hidden");
  if (showCard && !installCardDismissed) refs.installHintCard?.classList.remove("hidden");
}

function hideInstallUi() {
  refs.installBtn?.classList.add("hidden");
  refs.installHintCard?.classList.add("hidden");
}

async function triggerInstallPrompt() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    try {
      const choice = await deferredInstallPrompt.userChoice;
      if (choice?.outcome === "accepted") hideInstallUi();
      else showInstallUi(true);
    } catch {
      // Ignore; user can cancel install.
    }
    deferredInstallPrompt = null;
    return;
  }
  if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    refs.installHintText.textContent = "Install requires HTTPS. Open this app on a secure https:// link to install.";
    showInstallUi(true);
    return;
  }
  if (isIosDevice()) {
    refs.installHintText.textContent = "On iPhone/iPad: tap Share then 'Add to Home Screen' to install.";
  } else {
    refs.installHintText.textContent = "Install option is available in browser menu (usually the install icon in address bar).";
  }
  showInstallUi(true);
}

function initInstallExperience() {
  if (isStandaloneDisplay()) {
    hideInstallUi();
    return;
  }

  refs.installHintText.textContent = "Open browser menu and choose Install App/Add to Home Screen.";
  showInstallUi(true);

  if (isIosDevice()) {
    refs.installHintText.textContent = "Install on iPhone/iPad: tap Share and select 'Add to Home Screen'.";
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    refs.installHintText.textContent = "Install this app for faster access on your mobile or PC.";
    showInstallUi(true);
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallUi();
  });

  refs.installBtn?.addEventListener("click", triggerInstallPrompt);
  refs.installNowBtn?.addEventListener("click", triggerInstallPrompt);
  refs.installCloseBtn?.addEventListener("click", () => {
    installCardDismissed = true;
    refs.installHintCard?.classList.add("hidden");
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Silent fallback; app still works without offline cache.
    });
  });
}

initInstallExperience();
registerServiceWorker();





























