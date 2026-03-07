# 296 Group Unified Web App

## Files
- `index.html`
- `styles.css`
- `app.js`

## Run
Open `index.html` in any modern browser.

## Default Access
- Admin password: `Admin@296`
- Staff code: `Staff@296`
- Customer login: email (must be registered first by staff/admin)

## Included Features
- 3 interfaces: Admin, Staff, Customer
- 3 company modules: 296 Group, Travel Nama, Umeed e Rozgar
- Admin show/hide controls by role and company
- Customer databank with serial, short app ID, visa/work/visit/umrah details
- Payment + refund + refund reason tracking
- Apply Date and Travel Date fields
- Daily/Monthly/Yearly sales summary
- Notifications when a new customer is registered
- English/Urdu toggle on top
- WhatsApp direct buttons for each company
- CSV export for Google Sheets import
- Google Drive/Sheets links configurable in Admin Settings
- Mobile + desktop responsive UI

## Required Final Inputs From You
- 3 original company logos/photos (replace placeholder visuals)
- Real Google Drive/Sheets links in admin settings
- Production backend/API for secure auth and permanent storage

## Security Note
The app now uses server-side Netlify Functions and PostgreSQL storage.
For production hardening, keep:
- Backend auth (Supabase Auth / JWT)
- Hashed passwords (bcrypt/argon2)
- Database with role-based access control
- HTTPS, WAF, rate limiting, audit logs, encrypted backups

## Netlify Functions Backend (Google Drive Compatibility)

Added server-side integration for:
- Google Drive folder creation per Application ID
- Document upload to application-specific Drive folder
- Saving `drive_folder_url` in PostgreSQL

### New Files
- `netlify.toml`
- `package.json`
- `netlify/functions/create-application-drive-folder.js`
- `netlify/functions/upload-application-documents.js`
- `netlify/functions/_lib/googleDrive.js`
- `netlify/functions/_lib/db.js`
- `netlify/functions/_lib/http.js`

### Required Environment Variables
Set these in Netlify Site Settings -> Environment Variables:
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_DRIVE_PARENT_FOLDER_ID`
- `DATABASE_URL`

Optional table/column overrides:
- `APPLICATIONS_TABLE` (default: `applications`)
- `APP_ID_COLUMN` (default: `application_id`)
- `DRIVE_FOLDER_COLUMN` (default: `drive_folder_url`)
- `DOCUMENTS_TABLE` (default: `application_documents`)

### API Endpoints
1) Create/ensure app folder + save URL in DB
- `POST /.netlify/functions/create-application-drive-folder`
- JSON body:
  ```json
  { "applicationId": "UR-05032026-0001" }
  ```

2) Upload docs to app folder + save file metadata in DB
- `POST /.netlify/functions/upload-application-documents`
- `multipart/form-data`
- fields:
  - `applicationId` (required)
  - files (passport/cv/visa/etc)

### Legacy Compatibility Schema
```sql
CREATE TABLE IF NOT EXISTS applications (
  application_id TEXT PRIMARY KEY,
  drive_folder_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS application_documents (
  id BIGSERIAL PRIMARY KEY,
  application_id TEXT NOT NULL,
  drive_file_id TEXT,
  drive_file_url TEXT,
  file_name TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Security/Scalability Notes
- Service account credentials stay server-side only.
- Application ID format is validated (`AA-DDMMYYYY-0001`).
- File size limit: 25MB per file.
- MIME type whitelist enforced.
- Uses pooled PostgreSQL connections.
- Designed for stateless Netlify Function execution.

### Frontend Integration Notes
When creating a new application in the web app:
1. Call `/.netlify/functions/create-application-drive-folder` with `applicationId`
2. Save returned `driveFolderUrl` into PostgreSQL (`drive_folder_url`)
3. For documents upload, send multipart request to `/.netlify/functions/upload-application-documents`

The current app code now attempts these function calls automatically and falls back safely if endpoint is unavailable.

## Supabase CRM Upgrade

Upgraded architecture:
- Frontend: existing Netlify web app (`index.html`, `app.js`, `styles.css`)
- Backend: Supabase PostgreSQL via Netlify Functions
- API: Supabase/PostgreSQL-backed Netlify functions
- Storage: Supabase Storage (optional) with Google Drive fallback

### New CRM API Functions
- `/.netlify/functions/crm-bootstrap`
- `/.netlify/functions/crm-dashboard`
- `/.netlify/functions/crm-reference`
- `/.netlify/functions/crm-candidates`
- `/.netlify/functions/crm-applications`
- `/.netlify/functions/crm-agents`
- `/.netlify/functions/crm-jobs`
- `/.netlify/functions/crm-documents`
- `/.netlify/functions/crm-payments`
- `/.netlify/functions/crm-reports`

### CRM Database Tables
- `users`
- `companies`
- `agents`
- `candidates`
- `applications`
- `documents`
- `jobs`
- `countries`
- `payments`
- `notifications`

Schema file:
- `supabase/schema.sql`

### Required Environment Variables
- `SUPABASE_DB_URL` (or `DATABASE_URL`)
- `SUPABASE_URL` (for Supabase Storage uploads)
- `SUPABASE_SERVICE_ROLE_KEY` (for Supabase Storage uploads)
- `SUPABASE_STORAGE_BUCKET` (for Supabase Storage uploads)
- `SUPABASE_STORAGE_PUBLIC_BASE_URL` (optional)

Example file:
- `.env.example`

### Recruitment Pipeline Stages
- Application
- Documents Submitted
- Client Selection
- Medical
- Embassy
- Visa Issued
- Ticket
