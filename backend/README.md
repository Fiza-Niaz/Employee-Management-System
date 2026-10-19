# Employee Management API

## Setup

Create your local `.env` from the example, then edit it with real values:

```powershell
Copy-Item .env.example .env
```

For Atlas, create a database user and cluster, then select **Connect → Drivers** in Atlas and copy its connection string into `MONGODB_URI`. Replace the username and password placeholders; URL-encode any special characters in the password. The example URI selects the `employee_management` database. Replace the JWT and administrator placeholders too. Keep `.env` private and never commit the real connection string.

If Node.js reports `querySrv ECONNREFUSED`, `DNS_SERVERS` can specify comma-separated DNS resolver IP addresses for Node's SRV lookup. The example uses Cloudflare (`1.1.1.1`) and Google (`8.8.8.8`); use resolvers permitted by your network. This setting is optional.

In Atlas **Network Access**, allow connections from the backend host's outbound IP addresses. If the host does not provide fixed outbound IPs, configure the broadest access its documentation recommends and protect the cluster with a strong database password and a least-privilege database user.

`CORS_ORIGINS` is a comma-separated list of exact browser origins allowed to call the API, with no trailing slash. Add your Vercel production domain (and any preview domain you intend to use) to this list in the backend host's environment settings. Local Vite development uses its `/api` proxy.

From this directory, install dependencies, seed the administrator, then start the API:

```powershell
npm install
npm run seed:admin
npm run dev
```

The seed command is safe to rerun for the same administrator email. It hashes the password before storing it.

## Deployment

Deploy the backend as a Node.js web service from the `backend` directory with `npm start` as its start command. Configure `MONGODB_URI`, `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CORS_ORIGINS` in the hosting provider's environment settings; local `.env` files are not uploaded by Vercel or other hosts. Run `npm run seed:admin` once with those same production environment variables to create the administrator in Atlas.

Deploy the `frontend` directory separately to Vercel. Use `npm run build` and `dist` as the output directory, and set `VITE_API_URL` to the deployed backend URL ending in `/api` (for example, `https://your-api.example.com/api`). Vite embeds this value at build time, so redeploy the frontend after changing it. Add the deployed frontend's exact origin to the backend's `CORS_ORIGINS`, then redeploy/restart the backend.

After deployment, check `https://your-api.example.com/api/health`. A successful response confirms the API is running; it does not verify database access. The backend startup logs should also report `Connected to MongoDB` when Atlas connects.

## Authentication

`POST /api/auth/login` accepts `{ "email": "...", "password": "..." }` and returns a JWT plus basic user details. Send the token on protected routes as `Authorization: Bearer <token>`. Employee and department routes require an administrator.

## Routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/employees` | List employees |
| POST | `/api/employees` | Create an employee |
| GET | `/api/employees/:id` | Get an employee |
| PUT, PATCH | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |
| GET | `/api/departments` | List departments |
| POST | `/api/departments` | Create a department |
| PUT, PATCH | `/api/departments/:id` | Update a department |
| DELETE | `/api/departments/:id` | Delete a department |

Employee creation requires `name`, `email`, `phone`, `address`, `salary`, `department`, and `image`. Department creation requires `name` and `description`.
