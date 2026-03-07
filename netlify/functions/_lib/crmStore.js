const { Pool } = require("pg");

const STAGES = [
  "Application",
  "Documents Submitted",
  "Client Selection",
  "Medical",
  "Embassy",
  "Visa Issued",
  "Ticket",
];

let cachedPool = null;
let schemaReady = false;

function getPool() {
  if (cachedPool) return cachedPool;
  const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing SUPABASE_DB_URL or DATABASE_URL environment variable.");
  }
  cachedPool = new Pool({
    connectionString,
    max: 10,
    ssl: { rejectUnauthorized: false },
  });
  return cachedPool;
}

function normalizeText(value) {
  const v = String(value ?? "").trim();
  return v || null;
}

function normalizeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeDate(value) {
  const v = String(value || "").trim();
  return v || null;
}

function normalizeStage(value) {
  const input = String(value || "").trim();
  if (!input) return "Application";
  const found = STAGES.find((x) => x.toLowerCase() === input.toLowerCase());
  return found || "Application";
}

function stageFromStatus(status) {
  const s = String(status || "").toLowerCase();
  if (!s || s.includes("applied") || s.includes("new")) return "Application";
  if (s.includes("document")) return "Documents Submitted";
  if (s.includes("selection") || s.includes("selected")) return "Client Selection";
  if (s.includes("medical")) return "Medical";
  if (s.includes("embassy")) return "Embassy";
  if (s.includes("visa")) return "Visa Issued";
  if (s.includes("ticket") || s.includes("travel")) return "Ticket";
  return "Application";
}

async function ensureCrmSchema() {
  if (schemaReady) return;
  const pool = getPool();
  const sql = `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'staff',
      password_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS agents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      parent_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
      agent_code TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'agent',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS countries (
      id BIGSERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      is_gcc BOOLEAN NOT NULL DEFAULT FALSE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      job_title TEXT NOT NULL,
      client_name TEXT,
      country_id BIGINT REFERENCES countries(id) ON DELETE SET NULL,
      salary NUMERIC(12,2) DEFAULT 0,
      quantity INT DEFAULT 1,
      status TEXT DEFAULT 'open',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS candidates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      father_name TEXT,
      passport_number TEXT,
      phone TEXT,
      email TEXT,
      country_preference BIGINT REFERENCES countries(id) ON DELETE SET NULL,
      job_category TEXT,
      agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
      status TEXT DEFAULT 'New Lead',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      application_id TEXT UNIQUE NOT NULL,
      candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
      company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
      job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
      stage TEXT NOT NULL DEFAULT 'Application',
      status TEXT DEFAULT 'Applied',
      application_date DATE DEFAULT CURRENT_DATE,
      travel_date DATE,
      total_payment NUMERIC(12,2) DEFAULT 0,
      advance_payment NUMERIC(12,2) DEFAULT 0,
      refund_payment NUMERIC(12,2) DEFAULT 0,
      remaining_payment NUMERIC(12,2) DEFAULT 0,
      drive_folder_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS documents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
      application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
      document_type TEXT NOT NULL,
      document_url TEXT NOT NULL,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (application_id, document_type)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
      application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
      amount NUMERIC(12,2) NOT NULL DEFAULT 0,
      payment_type TEXT NOT NULL,
      status TEXT DEFAULT 'recorded',
      payment_date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
      application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS applicants (
      id BIGSERIAL PRIMARY KEY,
      app_id TEXT UNIQUE NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_candidates_passport_number ON candidates(passport_number);
    CREATE INDEX IF NOT EXISTS idx_candidates_agent_id ON candidates(agent_id);
    CREATE INDEX IF NOT EXISTS idx_applications_candidate_id ON applications(candidate_id);
    CREATE INDEX IF NOT EXISTS idx_applications_company_id ON applications(company_id);
    CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
    CREATE INDEX IF NOT EXISTS idx_payments_candidate_id ON payments(candidate_id);
    CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at);
    CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications(stage);
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
    CREATE SEQUENCE IF NOT EXISTS agent_code_seq START 1;
    ALTER TABLE agents ADD COLUMN IF NOT EXISTS agent_code TEXT;
    UPDATE agents
       SET agent_code = lpad(nextval('agent_code_seq')::text, 4, '0')
     WHERE agent_code IS NULL OR agent_code !~ '^[0-9]{4}$';
    CREATE UNIQUE INDEX IF NOT EXISTS idx_agents_agent_code_unique ON agents(agent_code);
    ALTER TABLE jobs ADD COLUMN IF NOT EXISTS client_name TEXT;
  `;
  await pool.query(sql);
  await seedStaticData();
  schemaReady = true;
}

async function seedStaticData() {
  const pool = getPool();
  const countries = [
    { name: "Saudi Arabia", is_gcc: true },
    { name: "United Arab Emirates", is_gcc: true },
    { name: "Qatar", is_gcc: true },
    { name: "Kuwait", is_gcc: true },
    { name: "Bahrain", is_gcc: true },
    { name: "Oman", is_gcc: true },
    { name: "Pakistan", is_gcc: false },
    { name: "Malaysia", is_gcc: false },
    { name: "Turkey", is_gcc: false },
    { name: "United Kingdom", is_gcc: false },
  ];
  for (const country of countries) {
    await pool.query(
      `INSERT INTO countries(name, is_gcc) VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET is_gcc = EXCLUDED.is_gcc`,
      [country.name, country.is_gcc]
    );
  }

  const companies = [
    { name: "Travel Nama", description: "Travel and tourist solutions company" },
    { name: "Umeed e Rozgar", description: "Overseas and local recruiting and consultancy services" },
    { name: "296 Group", description: "Main management company" },
  ];
  for (const company of companies) {
    await pool.query(
      `INSERT INTO companies(name, description) VALUES ($1, $2)
       ON CONFLICT (name) DO NOTHING`,
      [company.name, company.description]
    );
  }
}

async function findOrCreateCountry(client, countryName) {
  const name = normalizeText(countryName);
  if (!name) return null;
  const found = await client.query("SELECT id FROM countries WHERE lower(name)=lower($1) LIMIT 1", [name]);
  if (found.rowCount) return found.rows[0].id;
  const inserted = await client.query("INSERT INTO countries(name) VALUES ($1) RETURNING id", [name]);
  return inserted.rows[0].id;
}

async function findOrCreateCompany(client, companyName) {
  const name = normalizeText(companyName) || "General";
  const found = await client.query("SELECT id FROM companies WHERE lower(name)=lower($1) LIMIT 1", [name]);
  if (found.rowCount) return found.rows[0].id;
  const inserted = await client.query("INSERT INTO companies(name) VALUES ($1) RETURNING id", [name]);
  return inserted.rows[0].id;
}

async function findOrCreateAgent(client, { agentId, agentName, agentEmail, agentPhone, role = "agent" }) {
  const directId = normalizeText(agentId);
  if (directId) {
    const byId = await client.query("SELECT id FROM agents WHERE id=$1 LIMIT 1", [directId]);
    if (byId.rowCount) return byId.rows[0].id;
  }

  const email = normalizeText(agentEmail);
  const name = normalizeText(agentName);
  if (!email && !name) return null;

  if (email) {
    const found = await client.query("SELECT id FROM agents WHERE lower(email)=lower($1) LIMIT 1", [email]);
    if (found.rowCount) return found.rows[0].id;
  }

  if (name) {
    const foundByName = await client.query("SELECT id FROM agents WHERE lower(name)=lower($1) LIMIT 1", [name]);
    if (foundByName.rowCount) return foundByName.rows[0].id;
  }

  const inserted = await client.query(
    "INSERT INTO agents(name, email, phone, role) VALUES ($1, $2, $3, $4) RETURNING id",
    [name || email || "Agent", email, normalizeText(agentPhone), role]
  );
  return inserted.rows[0].id;
}

async function upsertCandidate(client, applicant, countryId, agentId) {
  const passport = normalizeText(applicant.passport || applicant.passportNo);
  const email = normalizeText(applicant.email);

  let existing = null;
  if (passport) {
    const byPassport = await client.query(
      "SELECT id FROM candidates WHERE passport_number=$1 ORDER BY created_at ASC LIMIT 1",
      [passport]
    );
    if (byPassport.rowCount) existing = byPassport.rows[0];
  }
  if (!existing && email) {
    const byEmail = await client.query(
      "SELECT id FROM candidates WHERE lower(email)=lower($1) ORDER BY created_at ASC LIMIT 1",
      [email]
    );
    if (byEmail.rowCount) existing = byEmail.rows[0];
  }

  const values = [
    normalizeText(applicant.name) || "Unknown",
    normalizeText(applicant.fatherName),
    passport,
    normalizeText(applicant.contact || applicant.phone),
    email,
    countryId,
    normalizeText(applicant.tradeCategory || applicant.skill),
    agentId,
    normalizeText(applicant.status) || "Applied",
  ];

  if (existing) {
    const updated = await client.query(
      `UPDATE candidates
         SET name=$1,
             father_name=$2,
             passport_number=$3,
             phone=$4,
             email=$5,
             country_preference=$6,
             job_category=$7,
             agent_id=$8,
             status=$9
       WHERE id=$10
       RETURNING *`,
      [...values, existing.id]
    );
    return updated.rows[0];
  }

  const inserted = await client.query(
    `INSERT INTO candidates
      (name, father_name, passport_number, phone, email, country_preference, job_category, agent_id, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    values
  );
  return inserted.rows[0];
}

async function upsertApplication(client, applicant, candidateId, companyId) {
  const applicationId = normalizeText(applicant.appId || applicant.applicationId);
  if (!applicationId) return null;
  const existing = await client.query("SELECT id FROM applications WHERE application_id=$1 LIMIT 1", [applicationId]);

  const stage = normalizeStage(applicant.stage || stageFromStatus(applicant.status));
  const total = normalizeNumber(applicant.totalPayment);
  const advance = normalizeNumber(applicant.advancePayment);
  const refund = normalizeNumber(applicant.refundPayment);
  const remaining = Math.max(0, normalizeNumber(applicant.remainingPayment || (total - advance - refund)));

  const values = [
    applicationId,
    candidateId,
    companyId,
    stage,
    normalizeText(applicant.status) || "Applied",
    normalizeDate(applicant.applyDate),
    normalizeDate(applicant.travelDate),
    total,
    advance,
    refund,
    remaining,
    normalizeText(applicant.driveFolderUrl),
  ];

  if (existing.rowCount) {
    const updated = await client.query(
      `UPDATE applications
          SET candidate_id=$2,
              company_id=$3,
              stage=$4,
              status=$5,
              application_date=COALESCE($6::date, application_date),
              travel_date=$7::date,
              total_payment=$8,
              advance_payment=$9,
              refund_payment=$10,
              remaining_payment=$11,
              drive_folder_url=COALESCE($12, drive_folder_url),
              updated_at=NOW()
        WHERE application_id=$1
        RETURNING *`,
      values
    );
    return updated.rows[0];
  }

  const inserted = await client.query(
    `INSERT INTO applications
      (application_id, candidate_id, company_id, stage, status, application_date, travel_date, total_payment, advance_payment, refund_payment, remaining_payment, drive_folder_url)
     VALUES ($1,$2,$3,$4,$5,COALESCE($6::date,CURRENT_DATE),$7::date,$8,$9,$10,$11,$12)
     RETURNING *`,
    values
  );
  return inserted.rows[0];
}

function explodeDocuments(legacyDocs) {
  if (!legacyDocs || typeof legacyDocs !== "object") return [];
  const rows = [];
  const singles = ["passportCopy", "idCopy", "medicalReport", "ticketCopy", "cv"];
  singles.forEach((key) => {
    const item = legacyDocs[key];
    const url = normalizeText(item?.driveLink || item?.url || item?.documentUrl);
    if (url) rows.push({ type: key, url });
  });
  if (Array.isArray(legacyDocs.otherDocs)) {
    legacyDocs.otherDocs.forEach((item, idx) => {
      const url = normalizeText(item?.driveLink || item?.url || item?.documentUrl);
      if (url) rows.push({ type: `other_${idx + 1}`, url });
    });
  }
  return rows;
}

function collapseDocuments(rows) {
  const docs = {};
  const others = [];
  rows.forEach((row) => {
    const type = String(row.document_type || "");
    const item = { driveLink: row.document_url, name: row.document_type };
    if (type.startsWith("other_")) others.push(item);
    else docs[type] = item;
  });
  if (others.length) docs.otherDocs = others;
  return docs;
}

async function syncApplicationPayments(client, applicationRow, candidateId) {
  await client.query(
    `DELETE FROM payments
     WHERE application_id = $1
       AND payment_type IN ('total','advance','refund')
       AND status = 'recorded'`,
    [applicationRow.id]
  );
  const definitions = [
    { type: "total", amount: normalizeNumber(applicationRow.total_payment) },
    { type: "advance", amount: normalizeNumber(applicationRow.advance_payment) },
    { type: "refund", amount: normalizeNumber(applicationRow.refund_payment) },
  ];
  for (const item of definitions) {
    if (item.amount <= 0) continue;
    await client.query(
      `INSERT INTO payments (candidate_id, application_id, amount, payment_type, status, payment_date)
       VALUES ($1, $2, $3, $4, 'recorded', CURRENT_DATE)`,
      [candidateId, applicationRow.id, item.amount, item.type]
    );
  }
}

async function upsertApplicantFromLegacy(applicant, actor = {}) {
  await ensureCrmSchema();
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const countryId = await findOrCreateCountry(client, applicant.country || applicant.countryPreference);
    const companyId = await findOrCreateCompany(client, applicant.serviceCompany || applicant.companyName);
    const agentId = await findOrCreateAgent(client, {
      agentId: applicant.agentId,
      agentName: applicant.agentName || actor.name,
      agentEmail: applicant.agentEmail || actor.email,
      agentPhone: applicant.agentPhone,
      role: actor.role === "sub_agent" ? "sub_agent" : "agent",
    });

    const candidate = await upsertCandidate(client, applicant, countryId, agentId);
    const application = await upsertApplication(client, applicant, candidate.id, companyId);

    await client.query(
      `INSERT INTO applicants(app_id, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (app_id)
       DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
      [normalizeText(applicant.appId || applicant.applicationId), JSON.stringify(applicant)]
    );

    const docs = explodeDocuments(applicant.documents);
    for (const doc of docs) {
      await client.query(
        `INSERT INTO documents(candidate_id, application_id, document_type, document_url, uploaded_at)
         VALUES ($1,$2,$3,$4,NOW())
         ON CONFLICT (application_id, document_type)
         DO UPDATE SET document_url = EXCLUDED.document_url, uploaded_at = NOW()`,
        [candidate.id, application.id, doc.type, doc.url]
      );
    }

    await syncApplicationPayments(client, application, candidate.id);

    await client.query(
      `INSERT INTO notifications(candidate_id, application_id, title, message)
       VALUES ($1, $2, 'Application Updated', $3)`,
      [candidate.id, application.id, `${candidate.name} (${application.application_id}) has been saved.`]
    );

    await client.query("COMMIT");
    return { candidate, application };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function listApplicantsLegacy() {
  await ensureCrmSchema();
  const pool = getPool();
  const query = `
    SELECT
      a.application_id,
      a.stage,
      a.status,
      a.application_date,
      a.travel_date,
      a.total_payment,
      a.advance_payment,
      a.refund_payment,
      a.remaining_payment,
      c.id AS candidate_id,
      c.name,
      c.father_name,
      c.passport_number,
      c.phone,
      c.email,
      c.job_category,
      co.name AS country_name,
      cmp.name AS company_name,
      ag.id AS agent_id,
      ag.name AS agent_name,
      ag.email AS agent_email,
      ag.phone AS agent_phone
    FROM applications a
    JOIN candidates c ON c.id = a.candidate_id
    LEFT JOIN countries co ON co.id = c.country_preference
    LEFT JOIN companies cmp ON cmp.id = a.company_id
    LEFT JOIN agents ag ON ag.id = c.agent_id
    ORDER BY a.created_at DESC
  `;
  const res = await pool.query(query);

  const applicationIds = res.rows.map((r) => r.application_id);
  let docsMap = new Map();
  let payloadMap = new Map();
  if (applicationIds.length) {
    const docs = await pool.query(
      `SELECT a.application_id, d.document_type, d.document_url
       FROM documents d
       JOIN applications a ON a.id = d.application_id
       WHERE a.application_id = ANY($1::text[])`,
      [applicationIds]
    );
    docsMap = docs.rows.reduce((acc, row) => {
      const key = row.application_id;
      const list = acc.get(key) || [];
      list.push(row);
      acc.set(key, list);
      return acc;
    }, new Map());

    const rawApplicants = await pool.query(
      `SELECT app_id, payload
       FROM applicants
       WHERE app_id = ANY($1::text[])`,
      [applicationIds]
    );
    payloadMap = rawApplicants.rows.reduce((acc, row) => {
      acc.set(row.app_id, row.payload || {});
      return acc;
    }, new Map());
  }

  const asArray = (value) => {
    if (Array.isArray(value)) return value.map((x) => String(x)).filter(Boolean);
    const one = normalizeText(value);
    return one ? [one] : [];
  };

  return res.rows.map((row, idx) => {
    const payload = payloadMap.get(row.application_id) || {};
    const linkedDocumentIds = asArray(payload.linkedDocumentIds);
    const linkedPaymentIds = asArray(payload.linkedPaymentIds);
    const collapsedDocs = collapseDocuments(docsMap.get(row.application_id) || []);
    const fallbackDocs = payload.documents && typeof payload.documents === "object" ? payload.documents : {};
    const docs = Object.keys(collapsedDocs).length ? collapsedDocs : fallbackDocs;

    return {
      ...payload,
      serial: idx + 1,
      appId: row.application_id,
      name: row.name,
      fatherName: row.father_name,
      passport: row.passport_number,
      contact: row.phone,
      email: row.email,
      tradeCategory: row.job_category,
      country: row.country_name || "",
      companyName: row.company_name || "",
      serviceCompany: row.company_name || "",
      stage: row.stage,
      status: row.status,
      applyDate: row.application_date ? String(row.application_date) : "",
      travelDate: row.travel_date ? String(row.travel_date) : "",
      totalPayment: normalizeNumber(row.total_payment),
      advancePayment: normalizeNumber(row.advance_payment),
      refundPayment: normalizeNumber(row.refund_payment),
      remainingPayment: normalizeNumber(row.remaining_payment),
      agentId: row.agent_id || payload.agentId || "",
      agentName: payload.agentName || row.agent_name || "",
      agentEmail: payload.agentEmail || row.agent_email || "",
      agentPhone: payload.agentPhone || row.agent_phone || "",
      linkedDocumentIds,
      linkedPaymentIds,
      documents: docs,
    };
  });
}

async function listAgents() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT id, parent_agent_id, agent_code, name, email, phone, role, created_at
     FROM agents
     ORDER BY created_at DESC`
  );
  return res.rows;
}

async function saveAgent(agent) {
  await ensureCrmSchema();
  const pool = getPool();
  const id = normalizeText(agent.id);
  const parentAgentId = normalizeText(agent.parentAgentId);
  const agentCode = normalizeText(agent.agent_code || agent.agentCode);
  const name = normalizeText(agent.name) || "Agent";
  const email = normalizeText(agent.email);
  const phone = normalizeText(agent.phone);
  const role = normalizeText(agent.role) || "agent";
  const payload = [parentAgentId, name, email, phone, role, agentCode];

  if (id) {
    const updated = await pool.query(
      `UPDATE agents
         SET parent_agent_id=$1, name=$2, email=$3, phone=$4, role=$5
       WHERE id=$6
       RETURNING *`,
      [parentAgentId, name, email, phone, role, id]
    );
    return updated.rows[0] || null;
  }

  if (email) {
    const existingByEmail = await pool.query(
      "SELECT id FROM agents WHERE lower(email)=lower($1) LIMIT 1",
      [email]
    );
    if (existingByEmail.rowCount) {
      const updated = await pool.query(
        `UPDATE agents
           SET parent_agent_id=$1, name=$2, email=$3, phone=$4, role=$5
         WHERE id=$6
         RETURNING *`,
        [parentAgentId, name, email, phone, role, existingByEmail.rows[0].id]
      );
      return updated.rows[0] || null;
    }
  }

  if (name && phone) {
    const existingByNamePhone = await pool.query(
      "SELECT id FROM agents WHERE lower(name)=lower($1) AND coalesce(phone,'')=coalesce($2,'') LIMIT 1",
      [name, phone]
    );
    if (existingByNamePhone.rowCount) {
      const updated = await pool.query(
        `UPDATE agents
           SET parent_agent_id=$1, name=$2, email=$3, phone=$4, role=$5
         WHERE id=$6
         RETURNING *`,
        [parentAgentId, name, email, phone, role, existingByNamePhone.rows[0].id]
      );
      return updated.rows[0] || null;
    }
  }

  try {
    const inserted = await pool.query(
      `INSERT INTO agents(parent_agent_id, name, email, phone, role, agent_code)
       VALUES ($1,$2,$3,$4,$5, COALESCE($6, lpad(nextval('agent_code_seq')::text, 4, '0')))
       RETURNING *`,
      payload
    );
    return inserted.rows[0];
  } catch (error) {
    if (String(error?.code || "") === "23505" && email) {
      const updated = await pool.query(
        `UPDATE agents
           SET parent_agent_id=$1, name=$2, email=$3, phone=$4, role=$5
         WHERE lower(email)=lower($6)
         RETURNING *`,
        [parentAgentId, name, email, phone, role, email]
      );
      if (updated.rowCount) return updated.rows[0];
    }
    throw error;
  }
}

async function listCountries() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query("SELECT id, name, is_gcc FROM countries WHERE is_active=true ORDER BY is_gcc DESC, name ASC");
  return res.rows;
}

async function listCompanies() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query("SELECT id, name, phone, address, description FROM companies ORDER BY name ASC");
  return res.rows;
}

async function listJobs() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT j.id, j.job_title, j.client_name, j.salary, j.quantity, j.status, j.created_at,
            c.id AS company_id, c.name AS company_name,
            co.id AS country_id, co.name AS country_name
     FROM jobs j
     LEFT JOIN companies c ON c.id = j.company_id
     LEFT JOIN countries co ON co.id = j.country_id
     ORDER BY j.created_at DESC`
  );
  return res.rows;
}

async function saveJob(job) {
  await ensureCrmSchema();
  const pool = getPool();
  const client = await pool.connect();
  try {
    const companyId = await findOrCreateCompany(client, job.companyName || job.company_id);
    const countryId = await findOrCreateCountry(client, job.countryName || job.country_id);
    const id = normalizeText(job.id);
    const payload = [
      companyId,
      normalizeText(job.jobTitle || job.job_title) || "General Worker",
      normalizeText(job.overseasClientName || job.client_name),
      countryId,
      normalizeNumber(job.salary),
      Math.max(1, Number(job.quantity || 1)),
      normalizeText(job.status) || "open",
    ];
    if (id) {
      const updated = await client.query(
        `UPDATE jobs
           SET company_id=$1, job_title=$2, client_name=$3, country_id=$4, salary=$5, quantity=$6, status=$7
         WHERE id=$8
         RETURNING *`,
        [...payload, id]
      );
      return updated.rows[0] || null;
    }
    const inserted = await client.query(
      `INSERT INTO jobs(company_id, job_title, client_name, country_id, salary, quantity, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      payload
    );
    return inserted.rows[0];
  } finally {
    client.release();
  }
}

async function listCandidates() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT c.id, c.name, c.father_name, c.passport_number, c.phone, c.email, c.job_category, c.status, c.created_at,
            co.name AS country_name, a.name AS agent_name, a.role AS agent_role
     FROM candidates c
     LEFT JOIN countries co ON co.id = c.country_preference
     LEFT JOIN agents a ON a.id = c.agent_id
     ORDER BY c.created_at DESC`
  );
  return res.rows;
}

async function saveCandidate(candidate, actor = {}) {
  await ensureCrmSchema();
  const pool = getPool();
  const client = await pool.connect();
  try {
    const countryId = await findOrCreateCountry(client, candidate.countryPreference || candidate.country_name);
    const agentId = await findOrCreateAgent(client, {
      agentId: candidate.agentId,
      agentName: candidate.agentName || actor.name,
      agentEmail: candidate.agentEmail || actor.email,
      agentPhone: candidate.agentPhone,
      role: actor.role === "sub_agent" ? "sub_agent" : "agent",
    });
    const id = normalizeText(candidate.id);
    const payload = [
      normalizeText(candidate.name) || "Unknown",
      normalizeText(candidate.fatherName || candidate.father_name),
      normalizeText(candidate.passportNumber || candidate.passport_number),
      normalizeText(candidate.phone),
      normalizeText(candidate.email),
      countryId,
      normalizeText(candidate.jobCategory || candidate.job_category),
      agentId,
      normalizeText(candidate.status) || "New Lead",
    ];
    if (id) {
      const updated = await client.query(
        `UPDATE candidates
           SET name=$1, father_name=$2, passport_number=$3, phone=$4, email=$5, country_preference=$6, job_category=$7, agent_id=$8, status=$9
         WHERE id=$10
         RETURNING *`,
        [...payload, id]
      );
      return updated.rows[0] || null;
    }
    const inserted = await client.query(
      `INSERT INTO candidates(name, father_name, passport_number, phone, email, country_preference, job_category, agent_id, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      payload
    );
    return inserted.rows[0];
  } finally {
    client.release();
  }
}

async function listApplications() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT a.id, a.application_id, a.stage, a.status, a.application_date, a.travel_date,
            a.total_payment, a.advance_payment, a.refund_payment, a.remaining_payment, a.drive_folder_url,
            c.name AS candidate_name, c.passport_number,
            cmp.name AS company_name,
            j.job_title
     FROM applications a
     JOIN candidates c ON c.id = a.candidate_id
     LEFT JOIN companies cmp ON cmp.id = a.company_id
     LEFT JOIN jobs j ON j.id = a.job_id
     ORDER BY a.created_at DESC`
  );
  return res.rows;
}

async function saveApplication(payload) {
  await ensureCrmSchema();
  const pool = getPool();
  const id = normalizeText(payload.id);
  const appId = normalizeText(payload.applicationId || payload.application_id);
  if (!id && !appId) throw new Error("Missing application id.");
  const values = [
    normalizeStage(payload.stage),
    normalizeText(payload.status) || "Applied",
    normalizeDate(payload.applicationDate || payload.application_date),
    normalizeDate(payload.travelDate || payload.travel_date),
    normalizeNumber(payload.totalPayment || payload.total_payment),
    normalizeNumber(payload.advancePayment || payload.advance_payment),
    normalizeNumber(payload.refundPayment || payload.refund_payment),
    normalizeNumber(payload.remainingPayment || payload.remaining_payment),
  ];
  let res;
  if (id) {
    res = await pool.query(
      `UPDATE applications
          SET stage=$1, status=$2, application_date=COALESCE($3::date, application_date), travel_date=$4::date,
              total_payment=$5, advance_payment=$6, refund_payment=$7, remaining_payment=$8, updated_at=NOW()
        WHERE id=$9
        RETURNING *`,
      [...values, id]
    );
  } else {
    res = await pool.query(
      `UPDATE applications
          SET stage=$1, status=$2, application_date=COALESCE($3::date, application_date), travel_date=$4::date,
              total_payment=$5, advance_payment=$6, refund_payment=$7, remaining_payment=$8, updated_at=NOW()
        WHERE application_id=$9
        RETURNING *`,
      [...values, appId]
    );
  }
  return res.rows[0] || null;
}

async function listDocuments() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT d.id, d.document_type, d.document_url, d.uploaded_at,
            a.application_id, c.name AS candidate_name, c.passport_number
     FROM documents d
     LEFT JOIN applications a ON a.id = d.application_id
     LEFT JOIN candidates c ON c.id = d.candidate_id
     ORDER BY d.uploaded_at DESC`
  );
  return res.rows;
}

async function saveDocument({ applicationId, candidateId, documentType, documentUrl }) {
  await ensureCrmSchema();
  const pool = getPool();
  const client = await pool.connect();
  try {
    let resolvedApplicationId = null;
    let resolvedCandidateId = normalizeText(candidateId);
    if (applicationId) {
      const app = await client.query("SELECT id, candidate_id FROM applications WHERE application_id=$1 LIMIT 1", [applicationId]);
      if (app.rowCount) {
        resolvedApplicationId = app.rows[0].id;
        resolvedCandidateId = resolvedCandidateId || app.rows[0].candidate_id;
      }
    }
    const inserted = await client.query(
      `INSERT INTO documents(candidate_id, application_id, document_type, document_url, uploaded_at)
       VALUES ($1,$2,$3,$4,NOW())
       ON CONFLICT (application_id, document_type)
       DO UPDATE SET document_url=EXCLUDED.document_url, uploaded_at=NOW()
       RETURNING *`,
      [resolvedCandidateId, resolvedApplicationId, normalizeText(documentType) || "other", normalizeText(documentUrl)]
    );
    return inserted.rows[0] || null;
  } finally {
    client.release();
  }
}

async function listPayments() {
  await ensureCrmSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT p.id, p.amount, p.payment_type, p.status, p.payment_date, p.created_at,
            a.application_id, c.name AS candidate_name, c.passport_number
     FROM payments p
     LEFT JOIN applications a ON a.id = p.application_id
     LEFT JOIN candidates c ON c.id = p.candidate_id
     ORDER BY p.created_at DESC`
  );
  return res.rows;
}

async function savePayment(payment) {
  await ensureCrmSchema();
  const pool = getPool();
  const client = await pool.connect();
  try {
    let applicationPk = null;
    let candidatePk = normalizeText(payment.candidateId);
    const appId = normalizeText(payment.applicationId);
    if (appId) {
      const app = await client.query("SELECT id, candidate_id FROM applications WHERE application_id=$1 LIMIT 1", [appId]);
      if (app.rowCount) {
        applicationPk = app.rows[0].id;
        candidatePk = candidatePk || app.rows[0].candidate_id;
      }
    }
    const inserted = await client.query(
      `INSERT INTO payments(candidate_id, application_id, amount, payment_type, status, payment_date)
       VALUES ($1,$2,$3,$4,$5,COALESCE($6::date,CURRENT_DATE))
       RETURNING *`,
      [
        candidatePk,
        applicationPk,
        normalizeNumber(payment.amount),
        normalizeText(payment.paymentType || payment.payment_type) || "service_fee",
        normalizeText(payment.status) || "recorded",
        normalizeDate(payment.paymentDate || payment.payment_date),
      ]
    );
    return inserted.rows[0] || null;
  } finally {
    client.release();
  }
}

async function getDashboardMetrics() {
  await ensureCrmSchema();
  const pool = getPool();
  const [totals, activeCases, agents, countries, revenue, pending] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM candidates"),
    pool.query("SELECT COUNT(*)::int AS count FROM applications WHERE stage <> 'Ticket'"),
    pool.query("SELECT COUNT(*)::int AS count FROM agents"),
    pool.query(`SELECT COUNT(DISTINCT c.country_preference)::int AS count FROM candidates c WHERE c.country_preference IS NOT NULL`),
    pool.query(
      `SELECT COALESCE(SUM(amount),0)::numeric AS amount
       FROM payments
       WHERE date_trunc('month', payment_date::timestamp) = date_trunc('month', now())`
    ),
    pool.query("SELECT COUNT(*)::int AS count FROM applications WHERE status ILIKE 'Pending%' OR status='Applied'"),
  ]);

  return {
    totalCandidates: totals.rows[0].count,
    activeVisaCases: activeCases.rows[0].count,
    agentsCount: agents.rows[0].count,
    countriesActive: countries.rows[0].count,
    monthlyRevenue: Number(revenue.rows[0].amount || 0),
    pendingApplications: pending.rows[0].count,
  };
}

async function getReports() {
  await ensureCrmSchema();
  const pool = getPool();
  const [countryDemand, agentPerformance, monthlyRecruitment, revenue] = await Promise.all([
    pool.query(
      `SELECT co.name AS country, COUNT(*)::int AS applications
       FROM applications a
       JOIN candidates c ON c.id = a.candidate_id
       LEFT JOIN countries co ON co.id = c.country_preference
       GROUP BY co.name
       ORDER BY applications DESC`
    ),
    pool.query(
      `SELECT ag.name AS agent, COUNT(c.id)::int AS candidates
       FROM agents ag
       LEFT JOIN candidates c ON c.agent_id = ag.id
       GROUP BY ag.name
       ORDER BY candidates DESC`
    ),
    pool.query(
      `SELECT to_char(date_trunc('month', a.application_date::timestamp), 'YYYY-MM') AS month,
              COUNT(*)::int AS total
       FROM applications a
       GROUP BY 1
       ORDER BY 1 DESC
       LIMIT 12`
    ),
    pool.query(
      `SELECT to_char(date_trunc('month', payment_date::timestamp), 'YYYY-MM') AS month,
              COALESCE(SUM(amount),0)::numeric AS amount
       FROM payments
       GROUP BY 1
       ORDER BY 1 DESC
       LIMIT 12`
    ),
  ]);

  return {
    countryDemand: countryDemand.rows,
    agentPerformance: agentPerformance.rows,
    monthlyRecruitment: monthlyRecruitment.rows,
    revenue: revenue.rows.map((row) => ({ ...row, amount: Number(row.amount || 0) })),
  };
}

module.exports = {
  STAGES,
  getPool,
  ensureCrmSchema,
  upsertApplicantFromLegacy,
  listApplicantsLegacy,
  listCountries,
  listCompanies,
  listAgents,
  saveAgent,
  listJobs,
  saveJob,
  listCandidates,
  saveCandidate,
  listApplications,
  saveApplication,
  listDocuments,
  saveDocument,
  listPayments,
  savePayment,
  getDashboardMetrics,
  getReports,
};
