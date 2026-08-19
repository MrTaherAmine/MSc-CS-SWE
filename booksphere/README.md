# BookSphere — Social Book Recommendation Platform

BookSphere is a full-stack social book discovery and recommendation platform being developed through the GOMYCODE Lab Phase.

## Current Status

**Phase 3/7 — Book Search and Recommendation**

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

## Phase 3 Workflow

1. Open `/search`.
2. Choose `All`, `Title`, `Author`, or `Genre`.
3. Search Open Library.
4. Choose **Recommend this book**.
5. Complete the description, rating, and recommendation note.
6. Submit while logged in.
7. The server stores the book and recommendation in MongoDB.
8. The recommendation is associated with the authenticated user.

## Phase 3 API

### Search books

```http
GET /api/books/search?q=clean+code&type=title
```

### Add recommendation

```http
POST /api/recommendations
```

The recommendation endpoint remains authenticated.

## Documentation

```text
docs/PHASE_1_REPORT.md
docs/PHASE_1_CHECKLIST.md
docs/PHASE_2_REPORT.md
docs/PHASE_2_CHECKLIST.md
docs/PHASE_3_API_RESEARCH.md
docs/PHASE_3_REPORT.md
docs/PHASE_3_CHECKLIST.md
```

## Next

**Phase 4/7 — Book Details and Rating System**

## Author

**Taher Amine ELHOUARI**

GOMYCODE — 15-Month Software Engineering Program
