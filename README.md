# GharPayy CRM

> Simple CRM for leads and agents (backend + React frontend)

**Project structure**
- **backend/**: Node/Express API server ([backend/index.js](backend/index.js#L1-L40))
- **client/**: React app created with Create React App

**Quick start**

Prerequisites: Node.js (16+), npm, MongoDB (optional — app falls back to local MongoDB)

1. Backend

   - Install dependencies:

     npm install

   - Environment variables (create a `.env` file in `backend/` if needed):

     - `MONGODB_URI` — MongoDB connection string (defaults to `mongodb://localhost:27017/gharpayy`)
     - `PORT` — server port (defaults to `5000`)
     - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` — optional SMTP credentials for reminder emails
     - `SMTP_PORT`, `SMTP_SECURE`, `SMTP_FROM` — optional additional SMTP settings
     - `REMINDER_DAYS` — how old a lead must be before sending reminders (defaults to `1`)

   - Run (development):

     cd backend
     npm run dev

   - Run (production):

     cd backend
     npm start

2. Client (React)

   - Install and run:

     cd client
     npm install
     npm start

   - The React app expects the backend API at the same origin or you can set up a proxy in `client/package.json`.

**API endpoints**
- `GET/POST/PUT/DELETE /api/leads` — lead management (see [routes/leads.js](backend/routes/leads.js))
- `GET/POST/PUT/DELETE /api/agents` — agent management (see [routes/agents.js](backend/routes/agents.js))

**Notes**
- The backend will attempt to connect to MongoDB and start the server even if the DB is unreachable (see [backend/index.js](backend/index.js#L1-L40)).
- Daily reminders run via `node-cron` at 09:00 (server time) and will attempt to send emails if SMTP env vars are set (see [backend/utils/reminders.js](backend/utils/reminders.js#L1-L120)).

**Contributing**
- Open issues or PRs for improvements or bug fixes.

**License**
- MIT
