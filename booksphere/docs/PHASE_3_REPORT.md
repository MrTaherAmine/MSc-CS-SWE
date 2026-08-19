# Phase 3 Report — Book Search and Recommendation

For Phase 3, I extended the existing BookSphere application with external book search and a complete recommendation workflow.

I researched available book-data services and selected **Open Library**. BookSphere uses the Open Library Search API for general, title, and author searches, the Subjects API for genre searches, and the Covers API to display book-cover images when a cover identifier is available.

I implemented a backend search adapter at `/api/books/search`. The server validates the search query and search type, calls the appropriate Open Library endpoint, and normalizes the external response into a consistent BookSphere book structure before returning it to the React frontend.

The React application now includes a dedicated Search page where users can search by all fields, title, author, or genre. Search results display the title, author, publication information, available subject data, and cover image. Selecting a result prefills the recommendation form.

The recommendation form includes the required title, author, description, and rating fields, as well as a short recommendation note. Both browser-side and server-side validation are used to reject incomplete or invalid submissions.

Recommendation submission remains protected by the Phase 2 authentication middleware. The backend stores the selected or manually entered book in MongoDB, creates the recommendation record, and automatically associates the recommendation with the currently authenticated user's MongoDB ID.

This phase therefore adds external API integration, book discovery, input validation, database persistence, and authenticated user ownership while continuing the same BookSphere codebase from Phases 1 and 2.
