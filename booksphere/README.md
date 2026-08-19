# BookSphere — Social Book Recommendation Platform

BookSphere is a full-stack social book discovery and recommendation platform being developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 5/7 — User Interaction and Recommendations Feed**

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
```

## Phase 5 Workflow

1. Log in and open `/feed` from **For You**.
2. BookSphere builds preference signals from favorite genres, likes, ratings, and follows.
3. Public recommendations are scored and returned with a human-readable reason.
4. Like, comment on, or share recommendations directly from the feed.
5. Open a reader profile to review their liked books, comments, and followers.
6. Follow the reader to strengthen their recommendations in future feed requests.
7. Use cursor-based **Load more** retrieval without reloading the existing feed.

## Phase 5 API

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
```

## Next

**Phase 6/7 — Awaiting the next GOMYCODE phase brief**

## Author

**Taher Amine ELHOUARI**

GOMYCODE — 15-Month Software Engineering Program
