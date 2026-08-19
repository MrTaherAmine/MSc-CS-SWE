# BookSphere — Social Book Recommendation Platform

BookSphere is a full-stack social book discovery and recommendation platform being developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 2/7 — User Authentication and Authorization**

### Phase 1 completed
- React/Vite frontend
- Node.js/Express backend
- MongoDB/Mongoose configuration
- User, Book, and Recommendation schemas
- recommendation API foundation

### Phase 2 completed
- user registration
- user login
- bcrypt password hashing
- JWT session management
- HTTP-only authentication cookie
- backend authentication middleware
- frontend authentication context
- protected dashboard route
- authenticated recommendation creation
- logout

## Run locally

```bash
npm install
npm run install:all
cp server/.env.example server/.env
npm run dev
```

Configure `server/.env`:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/booksphere
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Authentication API

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

Recommendation creation is now protected:

```text
POST /api/recommendations
```

## Optional demo data

```bash
npm run seed --prefix server
```

Demo account:

```text
demo@booksphere.local
Demo1234!
```

Use the demo account only for local development.

## Security notes

- plain-text passwords are never saved;
- password hashes are excluded from normal User queries;
- authentication uses signed JWTs;
- browser sessions use an HTTP-only cookie;
- protected routes validate the session before processing requests;
- `.env` files and secrets are excluded from Git.

## Phase documentation

- `docs/PHASE_1_REPORT.md`
- `docs/PHASE_1_CHECKLIST.md`
- `docs/PHASE_2_REPORT.md`
- `docs/PHASE_2_CHECKLIST.md`

## Next

**Phase 3/7 — Book Search and Recommendation**

## Author

**Taher Amine ELHOUARI**

GOMYCODE — 15-Month Software Engineering Program
