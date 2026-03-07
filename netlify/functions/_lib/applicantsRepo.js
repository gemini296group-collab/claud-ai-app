const { pool } = require("./db");

const APPLICANTS_TABLE = "applicants";

async function ensureApplicantsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS ${APPLICANTS_TABLE} (
      id BIGSERIAL PRIMARY KEY,
      app_id TEXT UNIQUE NOT NULL,
      name TEXT,
      passport TEXT,
      company_name TEXT,
      country TEXT,
      visa_type TEXT,
      status TEXT,
      apply_date DATE,
      travel_date DATE,
      total_payment NUMERIC,
      remaining_payment NUMERIC,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_applicants_app_id ON ${APPLICANTS_TABLE}(app_id);
    CREATE INDEX IF NOT EXISTS idx_applicants_status ON ${APPLICANTS_TABLE}(status);
  `;
  await pool.query(query);
}

function toNullableDate(value) {
  const v = String(value || "").trim();
  return v || null;
}

function toNullableNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function upsertApplicant(applicant) {
  const appId = String(applicant.appId || "").trim();
  if (!appId) return null;

  const query = `
    INSERT INTO ${APPLICANTS_TABLE}
      (app_id, name, passport, company_name, country, visa_type, status, apply_date, travel_date, total_payment, remaining_payment, payload, updated_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8::date, $9::date, $10, $11, $12::jsonb, NOW())
    ON CONFLICT (app_id)
    DO UPDATE SET
      name = EXCLUDED.name,
      passport = EXCLUDED.passport,
      company_name = EXCLUDED.company_name,
      country = EXCLUDED.country,
      visa_type = EXCLUDED.visa_type,
      status = EXCLUDED.status,
      apply_date = EXCLUDED.apply_date,
      travel_date = EXCLUDED.travel_date,
      total_payment = EXCLUDED.total_payment,
      remaining_payment = EXCLUDED.remaining_payment,
      payload = EXCLUDED.payload,
      updated_at = NOW()
    RETURNING *;
  `;

  const values = [
    appId,
    applicant.name || null,
    applicant.passport || null,
    applicant.companyName || applicant.serviceCompany || null,
    applicant.country || null,
    applicant.visaType || null,
    applicant.status || null,
    toNullableDate(applicant.applyDate),
    toNullableDate(applicant.travelDate),
    toNullableNumber(applicant.totalPayment),
    toNullableNumber(applicant.remainingPayment),
    JSON.stringify(applicant),
  ];

  const res = await pool.query(query, values);
  return res.rows[0] || null;
}

async function upsertApplicants(applicants) {
  const list = Array.isArray(applicants) ? applicants : [];
  for (const applicant of list) {
    await upsertApplicant(applicant);
  }
}

async function getApplicants() {
  const res = await pool.query(`SELECT payload FROM ${APPLICANTS_TABLE} ORDER BY id ASC`);
  return res.rows.map((r) => r.payload).filter(Boolean);
}

module.exports = {
  ensureApplicantsTable,
  upsertApplicants,
  getApplicants,
};
