# Phase 4 Report — Book Details and Rating System

For Phase 4, I extended the existing BookSphere MERN application with a complete database-backed book details page and an authenticated community rating system.

I created a dedicated MongoDB `Rating` model. Each rating connects one authenticated user to one stored book and contains a validated whole-number value from 1 to 5. A compound unique index on `(user, book)` ensures that the same reader cannot create duplicate ratings for one book. When a reader submits another rating for the same book, the backend updates the existing record.

The new public `GET /api/books/:bookId` endpoint retrieves the selected book from MongoDB. In parallel, it aggregates all ratings for that book, calculates the dynamic average and total, builds the 1–5 star distribution, retrieves public recommendation notes, and returns the logged-in reader's existing rating when a valid session is present.

The authenticated `PUT /api/books/:bookId/rating` endpoint validates the book identifier and rating value, confirms that the book exists, and uses an upsert operation to create or update the user's rating. It then recalculates the statistics from the `Rating` collection and synchronizes the book's denormalized `averageRating` and `ratingsCount` fields.

On the React frontend, `/books/:bookId` displays the book's cover, title, authors, description, publication information, ISBN values, genres, rating average, rating count, distribution, and public recommendations. The page includes an accessible custom star selector implemented with labeled radio inputs and keyboard focus support.

Book details and community statistics are public. Saving or updating a rating requires the JWT-protected authenticated session created in Phase 2. Direct details links were added to the home recommendation cards and to the success state after a new recommendation is created.

This phase therefore satisfies the complete flow required by GOMYCODE: select a book, retrieve its details from the database, display those details, accept a user rating, persist it safely, and dynamically return the updated result.
