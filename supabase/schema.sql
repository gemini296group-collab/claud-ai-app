-- 296 GROUP Unified Services
-- Recruitment CRM + Visa Management Schema (Supabase PostgreSQL)

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  role text not null default 'staff',
  password_hash text,
  created_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  phone text,
  address text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  parent_agent_id uuid references agents(id) on delete set null,
  name text not null,
  email text unique,
  phone text,
  role text not null default 'agent',
  created_at timestamptz not null default now()
);

create table if not exists countries (
  id bigserial primary key,
  name text unique not null,
  is_gcc boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  father_name text,
  passport_number text,
  phone text,
  email text,
  country_preference bigint references countries(id) on delete set null,
  job_category text,
  agent_id uuid references agents(id) on delete set null,
  status text default 'New Lead',
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  job_title text not null,
  country_id bigint references countries(id) on delete set null,
  salary numeric(12,2) default 0,
  quantity integer default 1,
  status text default 'open',
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  application_id text unique not null,
  candidate_id uuid not null references candidates(id) on delete cascade,
  company_id uuid references companies(id) on delete set null,
  job_id uuid references jobs(id) on delete set null,
  stage text not null default 'Application',
  status text default 'Applied',
  application_date date default current_date,
  travel_date date,
  total_payment numeric(12,2) default 0,
  advance_payment numeric(12,2) default 0,
  refund_payment numeric(12,2) default 0,
  remaining_payment numeric(12,2) default 0,
  drive_folder_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid references candidates(id) on delete cascade,
  application_id uuid references applications(id) on delete cascade,
  document_type text not null,
  document_url text not null,
  uploaded_at timestamptz not null default now(),
  unique (application_id, document_type)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid references candidates(id) on delete cascade,
  application_id uuid references applications(id) on delete cascade,
  amount numeric(12,2) not null default 0,
  payment_type text not null,
  status text default 'recorded',
  payment_date date default current_date,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  candidate_id uuid references candidates(id) on delete cascade,
  application_id uuid references applications(id) on delete cascade,
  title text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_candidates_passport_number on candidates(passport_number);
create index if not exists idx_candidates_agent_id on candidates(agent_id);
create index if not exists idx_applications_candidate_id on applications(candidate_id);
create index if not exists idx_applications_company_id on applications(company_id);
create index if not exists idx_jobs_company_id on jobs(company_id);
create index if not exists idx_payments_candidate_id on payments(candidate_id);

