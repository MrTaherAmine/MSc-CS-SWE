# BookSphere — Social Book Recommendation Platform

BookSphere is a full-stack social book discovery and recommendation platform being developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 4/7 — Book Details and Rating System**

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

## Phase 4 Workflow

1. Open a stored book from **Recent Recommendations**, or submit a new recommendation from `/search`.
2. BookSphere opens `/books/:bookId` and retrieves the book from MongoDB.
3. The page displays complete book metadata, recommendations, and rating statistics.
4. A logged-in reader selects 1–5 stars and saves the rating.
5. The backend creates the reader's first rating or updates the existing one.
6. The average, total count, and rating distribution refresh immediately.

## Phase 4 API

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
```

## Next

**Phase 5/7 — Social Interaction and User Profiles**

## Author

**Taher Amine ELHOUARI**

GOMYCODE — 15-Month Software Engineering Program
