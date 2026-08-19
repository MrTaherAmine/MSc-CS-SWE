# Phase 3 Requirement Checklist

| GOMYCODE requirement | BookSphere implementation |
|---|---|
| Research and choose book API | Open Library — documented in `PHASE_3_API_RESEARCH.md` |
| Search by title | `/api/books/search?type=title` |
| Search by author | `/api/books/search?type=author` |
| Search by genre | `/api/books/search?type=genre` using Subjects API |
| Recommendation form | `client/src/pages/SearchPage.jsx` |
| Form fields | title, author, description, rating, recommendation note |
| Input validation | HTML validation + backend validation |
| Form submission | `createRecommendation()` through BookSphere API |
| Store recommendations | MongoDB `Recommendation` collection |
| Associate recommendation with user | authenticated `req.user._id` saved on recommendation |
| Public repository | existing MSc `booksphere` folder |

## New Phase 3 routes

```text
GET  /api/books/search
POST /api/recommendations   (authenticated)
```

## Search types

```text
all
title
author
genre
```
