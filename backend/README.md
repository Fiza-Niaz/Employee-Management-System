# Employee Management API

## Setup

Configure `.env` with a MongoDB connection string, a random `JWT_SECRET` of at least 32 characters, and the administrator's `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (at least 12 characters). `.env.example` shows the required variables. Keep `.env` private.

From this directory, install dependencies, seed the administrator, then start the API:

```powershell
npm install
npm run seed:admin
npm run dev
```

The seed command is safe to rerun for the same administrator email. It hashes the password before storing it.

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
