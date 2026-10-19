# PeopleDesk frontend

## Run locally

Start the backend first on port `5000`, then from this directory run:

```powershell
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). Vite proxies `/api` requests to `http://localhost:5000`. Set `VITE_API_URL` in a local `.env.local` file only if the API uses a different base URL. `.env.example` shows the local setting.

For production, deploy this directory to Vercel with build command `npm run build` and output directory `dist`. Set `VITE_API_URL` in the Vercel project settings to the deployed backend URL ending in `/api` (for example, `https://your-api.example.com/api`). The backend must be deployed separately and its `CORS_ORIGINS` setting must include the exact Vercel site origin. See the backend README for the Atlas and API deployment setup.

Sign in with the seeded administrator account from the backend `.env`. To create it, run `npm run seed:admin` from the backend directory. Public signup is disabled; accounts must be provisioned by an administrator.

Run `npm run build` to create a production build in `dist/`.
