# PeopleDesk frontend

## Run locally

Start the backend first on port `5000`, then from this directory run:

```powershell
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). Vite proxies `/api` requests to `http://localhost:5000`. Set `VITE_API_URL` in a local `.env.local` file only if the API uses a different base URL.

Sign in with the seeded administrator account from the backend `.env`. To create it, run `npm run seed:admin` from the backend directory. Public signup is disabled; accounts must be provisioned by an administrator.

Run `npm run build` to create a production build in `dist/`.
