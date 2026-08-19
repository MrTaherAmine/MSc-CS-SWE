# Phase 4 Requirement Checklist

| GOMYCODE requirement | BookSphere implementation |
|---|---|
| Design a book details page | `client/src/pages/BookDetailsPage.jsx` and Phase 4 styles |
| Show detailed book information | cover, title, authors, description, publication date, ISBN, and genres |
| Retrieve book from database | `GET /api/books/:bookId` uses `Book.findById()` |
| Implement a rating system | reusable accessible `StarRating` component with 1–5 options |
| Handle user ratings | authenticated `PUT /api/books/:bookId/rating` |
| Validate rating values | frontend selection plus backend integer/range validation |
| Associate rating with user | JWT middleware supplies `req.user._id` |
| Prevent duplicate ratings | unique MongoDB index on `(user, book)` |
| Allow rating changes | atomic `findOneAndUpdate(..., { upsert: true })` |
| Calculate average rating | MongoDB aggregation grouped by rating value |
| Display rating statistics | average, total count, and 1–5 distribution |
| Public GitHub submission | continue using the existing BookSphere public repository |

## New Phase 4 files

```text
server/src/models/Rating.js
client/src/components/StarRating.jsx
client/src/pages/BookDetailsPage.jsx
docs/PHASE_4_REPORT.md
docs/PHASE_4_CHECKLIST.md
```

## New Phase 4 routes

```text
GET /api/books/:bookId             public, optional session context
PUT /api/books/:bookId/rating      authenticated
```

## Rating rules

```text
minimum: 1
maximum: 5
whole numbers only
one current rating per user and book
resubmission updates the existing rating
```
