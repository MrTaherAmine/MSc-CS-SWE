# React Router Checkpoint — MovieVerse

Submission for **Front End Development: React Router — React Router Checkpoint**.

## Checkpoint requirements covered

- Continues the movie app from the React Hooks checkpoint
- Every movie includes a description and trailer embed URL
- Every movie card links to a dedicated route
- Dynamic route used: `/movie/:id`
- Movie details page displays:
  - title
  - description
  - poster
  - rating
  - embedded trailer
- Back-to-home navigation is available from the details page
- `BrowserRouter`, `Routes`, `Route`, `Link`, and `useParams` are used
- Previous add-movie and title/rating filtering functionality is preserved

## Project structure

```text
react-router-checkpoint/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddMovieForm.js
│   │   ├── Filter.js
│   │   ├── MovieCard.js
│   │   └── MovieList.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── MovieDetails.js
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   └── movies.js
├── .gitignore
├── package.json
└── README.md
```

## Install and run

```bash
npm install
npm start
```

The app normally opens at:

```text
http://localhost:3000
```

## How routing works

The home route is:

```text
/
```

Each movie uses a dynamic route such as:

```text
/movie/1
```

The `MovieDetails` component reads the movie ID from the URL using `useParams()` and finds the matching movie.

## Author

Taher Amine ELHOUARI
