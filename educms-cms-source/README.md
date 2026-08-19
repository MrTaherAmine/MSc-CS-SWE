# EduCMS — Educational Content Management System

A master's-level CMS project for educational institutions. EduCMS demonstrates a modern full-stack architecture with role-based access control, content CRUD, categories/tags, comments, media upload, SEO metadata, analytics, PostgreSQL persistence, optional Redis caching, and a responsive React admin interface.

## Stack

- **Frontend:** React + Vite + Material UI
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Caching:** Redis (optional)
- **Authentication:** JWT
- **Uploads:** Multer
- **Validation:** express-validator
- **Security:** Helmet, CORS, rate limiting

## Features

- JWT login and role-based access: Admin, Editor, Author, Subscriber
- Posts: create, edit, publish, archive, delete
- Categories and tags
- Comments and moderation
- Media uploads
- SEO fields
- Analytics overview
- Search and filtering
- Activity logging
- Optional Redis response caching
- Responsive admin dashboard

## Quick Start

### Option A — Docker (recommended)

```bash
docker compose up -d
```

Then:

```bash
cd backend
cp .env.example .env
npm install
npm run migrate
npm run seed
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:5000/api/v1`

### Option B — Local PostgreSQL

Create a PostgreSQL database named `educms_db`, then run:

```bash
psql -U postgres -d educms_db -f backend/src/database/schema.sql
```

Copy `backend/.env.example` to `backend/.env` and update the database credentials.

## Demo Account

After `npm run seed`:

- Email: `admin@educms.local`
- Password: `Admin123!`

Change these credentials immediately in any non-demo environment.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/auth/login` | Login |
| GET | `/api/v1/auth/me` | Current user |
| GET | `/api/v1/posts` | List/search posts |
| GET | `/api/v1/posts/:id` | Get post |
| POST | `/api/v1/posts` | Create post |
| PUT | `/api/v1/posts/:id` | Update post |
| DELETE | `/api/v1/posts/:id` | Delete post |
| GET/POST | `/api/v1/categories` | Categories |
| GET/POST | `/api/v1/tags` | Tags |
| GET/POST | `/api/v1/comments` | Comments |
| PATCH | `/api/v1/comments/:id/status` | Moderate comment |
| GET/POST | `/api/v1/media` | Media library/upload |
| GET | `/api/v1/analytics/summary` | Dashboard analytics |
| GET | `/api/v1/health` | Health check |

## Project Structure

```text
educms-cms-source/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .github/workflows/ci.yml
├── docker-compose.yml
└── README.md
```

## Deployment

The repository is deployment-ready for any provider that supports Node.js + PostgreSQL. Typical architecture:

- Frontend: Vercel / Netlify / static hosting
- Backend: Render / Railway / Heroku-compatible Node hosting
- PostgreSQL: managed Postgres
- Redis: optional managed Redis

Set the backend environment variables from `.env.example`, build the frontend with `npm run build`, and point `VITE_API_URL` to the production API.

## Author

**Taher Amine ELHOUARI**

Built as part of the 15-Month Software Engineering program.
