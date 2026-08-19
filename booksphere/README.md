# BookSphere — Social Book Recommendation Platform

BookSphere is a production-ready full-stack social book discovery and recommendation platform developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 7/7 — Deployment (final phase)**

### Phase 1 — Foundation
- React/Vite frontend
- Node.js/Express backend
- MongoDB/Mongoose configuration
- User, Book, and Recommendation schemas

### Phase 2 — Authentication
- registration and login
- bcrypt password hashing
- JWT sessions
- HTTP-only auth cookie
- protected frontend/backend routes
- logout

### Phase 3 — Search and Recommendations
- Open Library API integration
- search by title
- search by author
- search by genre
- Open Library cover images
- normalized backend search adapter
- recommendation form
- title/author/description/rating validation
- MongoDB persistence
- authenticated recommendation ownership

### Phase 4 — Details and Ratings
- database-backed book details page
- complete title, author, description, cover, publication, ISBN, and genre display
- accessible interactive 1–5 star rating control
- one rating per authenticated user and book
- existing-rating updates through an idempotent `PUT` endpoint
- live average rating, rating count, and 1–5 star distribution
- public reader recommendations displayed with each book
- direct details links from the community feed and recommendation workflow

### Phase 5 — Social Feed and Profiles
- like/unlike recommendations with one like per user
- add and retrieve recommendation comments
- native device sharing with clipboard fallback and share counts
- follow/unfollow reader relationships
- public reader profiles with liked books, comments, followers, and statistics
- self-service bio and favorite-genre preference editor
- explainable personalized recommendation scoring
- signals from favorite genres, liked/rated books, authors, followed readers, engagement, quality, and recency
- protected **For You** feed with cursor pagination
- indexed social collections, lean projections, capped queries, and on-demand comments

### Phase 6 — User Interface and Styling
- cohesive responsive design system with reusable color, spacing, radius, and shadow tokens
- polished discovery, search, authentication, details, feed, profile, and dashboard layouts
- responsive navigation with an accessible mobile menu
- desktop, tablet, and mobile breakpoints without framework-specific layout dependencies
- reusable loading, error, empty, and action states
- keyboard-visible focus states, a skip link, semantic landmarks, and accessible status messages
- touch-friendly controls and reduced-motion support
- consistent footer, branded surfaces, typography, buttons, forms, and book cards

### Phase 7 — Deployment
- Render Blueprint for a repeatable full-stack deployment
- MongoDB Atlas production database integration through a protected secret
- Express production server for both the API and compiled React single-page app
- same-origin API requests and secure production cookies
- health endpoint, graceful shutdown, proxy awareness, security headers, and asset caching
- GitHub Actions test/build/deployment validation gate
- automatic Render deployment only after required CI checks pass
- repeatable production verification script covering configuration, API health, SPA routing, and headers

## External Book API

BookSphere uses Open Library:

```text
https://openlibrary.org/search.json
https://openlibrary.org/subjects/<subject>.json
https://covers.openlibrary.org/b/id/<cover-id>-M.jpg
```

BookSphere does not expose the external API directly to the UI. The Express backend normalizes external results through:

```text
GET /api/books/search?q=<query>&type=<all|title|author|genre>
```

## Run Locally

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

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Verify the project:

```bash
npm test
npm run build
npm run check:deployment
```

Or run the complete Phase 7 gate:

```bash
npm run verify:deployment
```

## Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/MrTaherAmine/booksphere)

BookSphere uses one Render web service to host both the Express API and the
compiled React application. MongoDB Atlas provides the production database.

1. Push the `main` branch to the public GitHub repository.
2. Create a MongoDB Atlas cluster, database user, and network access entry.
3. Click **Deploy to Render** and connect the GitHub repository.
4. Paste the Atlas driver connection string when Render requests `MONGODB_URI`.
5. Render generates `JWT_SECRET`, builds the client, starts the server, and checks
   `/api/health` automatically.
6. Open the assigned `onrender.com` URL and complete the production smoke test in
   `docs/PHASE_7_DEPLOYMENT_GUIDE.md`.

Never commit the Atlas URI or JWT secret. They belong in Render's encrypted
environment-variable settings.

## Phase 6 Interface Review

1. Open the public discovery page and resize from desktop to mobile width.
2. Use the responsive menu at widths below 960px.
3. Review search, login, and registration forms with keyboard-only navigation.
4. Log in to review the dashboard, personalized feed, book details, and reader profiles.
5. Confirm loading, error, empty, success, hover, focus, and disabled states remain readable.
6. Enable reduced motion in the operating system to disable non-essential animation.

## Application API

### Search books

```http
GET /api/books/search?q=clean+code&type=title
```

### Add recommendation

```http
POST /api/recommendations
```

The recommendation endpoint remains authenticated.

### Retrieve book details and rating statistics

```http
GET /api/books/:bookId
```

The details endpoint is public. When a valid login cookie is present, the
response also includes that reader's current rating.

### Add or update a rating

```http
PUT /api/books/:bookId/rating
Content-Type: application/json

{ "rating": 5 }
```

The rating endpoint is authenticated and accepts whole numbers from 1 to 5.
The unique `(user, book)` database index prevents duplicate ratings.

### Personalized recommendations feed

```http
GET /api/feed?limit=12&cursor=<optional-cursor>
```

### Recommendation interactions

```http
PUT  /api/recommendations/:recommendationId/like
GET  /api/recommendations/:recommendationId/comments
POST /api/recommendations/:recommendationId/comments
POST /api/recommendations/:recommendationId/share
```

### Reader profiles and followers

```http
GET /api/users/:userId/profile
PUT /api/users/:userId/follow
PATCH /api/users/me/preferences
```

## Documentation

```text
docs/PHASE_1_REPORT.md
docs/PHASE_1_CHECKLIST.md
docs/PHASE_2_REPORT.md
docs/PHASE_2_CHECKLIST.md
docs/PHASE_3_API_RESEARCH.md
docs/PHASE_3_REPORT.md
docs/PHASE_3_CHECKLIST.md
docs/PHASE_4_REPORT.md
docs/PHASE_4_CHECKLIST.md
docs/PHASE_5_REPORT.md
docs/PHASE_5_CHECKLIST.md
docs/PHASE_5_RECOMMENDATION_ALGORITHM.md
docs/PHASE_6_REPORT.md
docs/PHASE_6_CHECKLIST.md
docs/PHASE_6_USABILITY_TEST.md
docs/PHASE_7_REPORT.md
docs/PHASE_7_CHECKLIST.md
docs/PHASE_7_DEPLOYMENT_GUIDE.md
```

## Project Status

All seven development phases are implemented. Production provisioning requires
the repository owner's GitHub/Render authorization and MongoDB Atlas URI.

## Author

**Taher Amine ELHOUARI**

GOMYCODE — 15-Month Software Engineering Program
