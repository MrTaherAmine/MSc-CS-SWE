# Phase 3 API Research

## Selected API: Open Library

BookSphere uses **Open Library** for its external book-search integration.

### Why it was selected

The Open Library Search API supports searching its catalog and returning book/work metadata. It can be queried generally and also supports title- and author-specific search parameters.

For genre browsing, BookSphere uses the Open Library Subjects API, which returns works associated with a named subject.

Book covers are displayed using the Open Library Covers API and a returned cover identifier.

### BookSphere integration

```text
GET /api/books/search?q=<query>&type=all
GET /api/books/search?q=<query>&type=title
GET /api/books/search?q=<query>&type=author
GET /api/books/search?q=<query>&type=genre
```

The backend acts as a small adapter between the Open Library response formats and BookSphere's internal book model. This keeps the React frontend independent of the external API's raw schema.

### External API endpoints used

```text
https://openlibrary.org/search.json
https://openlibrary.org/subjects/<subject>.json
https://covers.openlibrary.org/b/id/<cover-id>-M.jpg
```

No external API token is stored in the BookSphere repository.
