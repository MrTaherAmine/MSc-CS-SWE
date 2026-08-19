# Phase 5 Report — User Interaction and Recommendations Feed

For Phase 5, I expanded BookSphere from a discovery and rating application into a social, personalized book recommendation platform.

I implemented recommendation interactions that allow authenticated users to like or unlike recommendations, add comments, and share book links. Likes use a unique `(user, recommendation)` database index to prevent duplicates. Comments are validated, associated with the current user, and loaded only when a discussion is opened. Sharing uses the browser's native share capability when available and a clipboard fallback on other devices.

I added follower relationships and public user profile pages. Each profile displays the reader's information, favorite genres, follower and following totals, liked books, recent comments, and follower list. Authenticated users can follow or unfollow other readers, while self-following is rejected by the backend. Readers can also edit their own bio and favorite genres, giving them direct control over important feed preferences.

I created an explainable recommendation algorithm that builds a preference profile from favorite genres, genres and authors from liked books, Phase 4 book ratings, and followed readers. Candidate recommendations receive additional quality, engagement, and recency scores. Every feed item includes a reason explaining why it was recommended.

The React application now includes a protected **For You** feed. Users can like, comment, share, open book details, and visit reader profiles without leaving the feed workflow. Cursor-based pagination supports incremental loading.

Feed performance was optimized with compound MongoDB indexes, bounded query limits, field projections, Mongoose lean reads, cursor pagination instead of large offsets, batched like-state retrieval, and on-demand comment loading. CSS content visibility also reduces rendering work for long feeds.

The Phase 5 implementation therefore satisfies all required user interaction, profile, algorithm, personalized feed, and performance objectives while preserving the Phase 1–4 architecture.
