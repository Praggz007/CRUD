# MEAN-Stack-CRUD-with-Angular-15

## Quickstart

### 1. MongoDB Atlas Configuration
Open [`server/.env`](server/.env) and set your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/employee_db?retryWrites=true&w=majority
```
In Atlas, make sure the cluster is running and your current IP address is allowed under Network Access. URL-encode any special characters in the database password.

### 2. Run the Application
From the project root directory, run:
```bash
npm run dev
```
This runs both:
- **Backend**: Express API on `http://localhost:3000`
- **Frontend**: Angular 15 app on `http://localhost:4200`

Add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `AUTH_TOKEN_SECRET` to `server/.env` before signing in. The token secret must contain at least 32 characters. The Angular app sends the API token only for the current browser session.

### Deploy to Vercel

Create two Vercel projects from this repository, using the `client` directory as the frontend project's Root Directory and `server` as the API project's Root Directory. Vercel supports Angular and Express projects. For the Angular project, use Build Command `npm run build` and Output Directory `dist/client`; the build command generates the runtime API configuration. The Express project uses `server/app.js` as its exported app.

Set these environment variables on the API project:

```env
MONGODB_URI=your MongoDB Atlas connection string
CLIENT_URL=https://your-frontend-domain.vercel.app
ADMIN_USERNAME=your admin username
ADMIN_PASSWORD=use a long unique password
AUTH_TOKEN_SECRET=use at least 32 random characters
```

Set `API_URL=https://your-api-domain.vercel.app/api` on the frontend project. The client build reads this value; it must be the public URL of the API project plus `/api`.

###default details
to check out the app: use username:admin and password: db5639c86d5f4139bae1c8d39485326b
For local development, `API_URL` defaults to `http://localhost:3000/api`. `CLIENT_URL` accepts a comma-separated list of exact origins for local, preview, or production frontends. Configure secrets in Vercel Project Settings, not in source files. Keep Atlas access limited to the network sources you intend to allow.

---

 
