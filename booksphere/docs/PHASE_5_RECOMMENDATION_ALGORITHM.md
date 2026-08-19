# Phase 5 — Recommendation Algorithm

BookSphere uses a deterministic, explainable scoring algorithm. It does not require a paid recommendation service or a machine-learning model, and every signal comes from data already stored by the application.

## Preference signals

| Signal | How it affects recommendations |
|---|---|
| Favorite genres | strongest direct genre weight |
| Liked books | adds weight to their genres and authors |
| Book ratings | higher ratings add proportionally stronger genre and author weights |
| Followed readers | strongly promotes recommendations from those readers |
| Community likes/comments | logarithmic popularity boost that resists runaway counts |
| Book average rating | quality boost based on Phase 4 ratings |
| Recommendation age | moderate recency boost that gradually decreases |

## Explainability

Each feed item includes a short reason, for example:

```text
Because you follow Amina Reader
Matches your interest in Technology
More from David Thomas
Popular with the BookSphere community
```

## Retrieval and performance

- compound indexes support visibility/creation-date feed scans
- social relationship collections use unique compound indexes
- cursor pagination avoids large `skip` offsets
- feed requests return at most 24 items
- signal queries are capped to recent activity
- Mongoose `lean()` avoids document hydration for read-only results
- MongoDB projections retrieve only required signal fields
- likes for a feed page are fetched in one `$in` query
- comments are retrieved only when a user expands a discussion
- long feed cards use CSS `content-visibility` to reduce rendering work
