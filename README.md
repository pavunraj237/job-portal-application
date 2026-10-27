# Job Portal Application

A full-stack job portal with a React frontend and an Express/MongoDB backend. The interface includes job search and detail pages, account flows, candidate application pages, recruiter tools for posting and managing jobs, and an admin dashboard.

## Stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express, Mongoose, MongoDB, JWT

## Project layout

- `backend project/` — API server, routes, controllers, models, and database connection
- `online-project/` — React and Vite frontend

## Run locally

Requirements: Node.js and npm, plus a MongoDB database.

1. Install backend dependencies from the repository root:

   ```bash
   npm ci
   ```

2. Create `backend project/.env` using `backend project/.env.example` and set `MONGO_URI` and `JWT_SECRET` for your environment.

3. Start the API from the repository root:

   ```bash
   node "backend project/server.js"
   ```

   The backend listens on port `5000` by default. The frontend currently calls `http://localhost:5000`.

4. In a second terminal, install and start the frontend:

   ```bash
   cd online-project
   npm ci
   npm run dev
   ```

## Frontend scripts

Run these from `online-project/`:

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run lint` — run ESLint
- `npm run preview` — preview a production build

## Environment variables

- `PORT` — backend port; defaults to `5000`
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JSON Web Tokens; set a private value locally

Do not commit your real `.env` file or production credentials.
