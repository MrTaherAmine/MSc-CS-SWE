import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  createRecommendation,
  searchBooks
} from '../services/api.js';

const EMPTY_FORM = {
  externalId: '',
  source: 'manual',
  title: '',
  author: '',
  description: '',
  rating: '5',
  recommendationText: '',
  coverUrl: '',
  isbn10: '',
  isbn13: '',
  genres: []
};

export default function SearchPage() {
  const { authenticated } = useAuth();

  const [search, setSearch] = useState({
    query: '',
    type: 'all'
  });
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState('');
  const [savedBookId, setSavedBookId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selectedLabel = !form.title
    ? 'No book selected'
    : form.author
      ? `${form.title} — ${form.author}`
      : form.title;

  async function runSearch(event) {
    event.preventDefault();
    setSearchError('');
    setSearching(true);

    try {
      const data = await searchBooks({
        query: search.query,
        type: search.type
      });

      setResults(data.results || []);
      setTotal(data.total || 0);
      setSource(data.source || 'Open Library');
    } catch (error) {
      setSearchError(error.message);
      setResults([]);
      setTotal(0);
    } finally {
      setSearching(false);
    }
  }

  function chooseBook(book) {
    setForm({
      externalId: book.externalId || '',
      source: book.source || 'open-library',
      title: book.title || '',
      author: book.authors?.[0] || '',
      description: book.description || '',
      rating: '5',
      recommendationText: '',
      coverUrl: book.coverUrl || '',
      isbn10: book.isbn10 || '',
      isbn13: book.isbn13 || '',
      genres: book.genres || []
    });

    setFormStatus('');
    setSavedBookId('');
    document
      .getElementById('recommend-form')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function submitRecommendation(event) {
    event.preventDefault();

    if (!authenticated) {
      setFormStatus('Please log in before adding a recommendation.');
      return;
    }

    setFormStatus('');
    setSubmitting(true);

    try {
      const response = await createRecommendation({
        book: {
          externalId: form.externalId || undefined,
          source: form.source || 'manual',
          title: form.title,
          authors: [form.author],
          description: form.description,
          coverUrl: form.coverUrl,
          isbn10: form.isbn10,
          isbn13: form.isbn13,
          genres: form.genres
        },
        recommendationText: form.recommendationText,
        rating: Number(form.rating),
        tags: form.genres.slice(0, 5)
      });

      setFormStatus('Recommendation added successfully.');
      setSavedBookId(response.data.book?._id || '');
      setForm(EMPTY_FORM);
    } catch (error) {
      setFormStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="search-page">
      <div className="search-intro">
        <p className="eyebrow purple">Explore the Open Library catalog</p>
        <h1>Search books and recommend what matters.</h1>
        <p>
          Search by title, author, or genre, then use a result to prefill your
          recommendation form.
        </p>
      </div>

      <form className="search-bar" onSubmit={runSearch}>
        <select
          value={search.type}
          onChange={event =>
            setSearch({ ...search, type: event.target.value })
          }
          aria-label="Search type"
        >
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>

        <input
          required
          minLength="2"
          placeholder={
            search.type === 'genre'
              ? 'e.g. science fiction'
              : 'Search Open Library…'
          }
          value={search.query}
          onChange={event =>
            setSearch({ ...search, query: event.target.value })
          }
        />

        <button className="search-button" disabled={searching}>
          {searching ? 'Searching…' : 'Search books'}
        </button>
      </form>

      {searchError && <div className="form-error">{searchError}</div>}

      {source && (
        <div className="search-meta">
          <span>{source}</span>
          <span>{total.toLocaleString()} matching works</span>
          <span>Showing {results.length}</span>
        </div>
      )}

      <div className="book-results">
        {results.map(book => (
          <article
            className="book-result"
            key={`${book.source}-${book.externalId}-${book.title}`}
          >
            <div className="cover-shell">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                />
              ) : (
                <span>No cover</span>
              )}
            </div>

            <div className="book-result-copy">
              <p className="result-source">Open Library</p>
              <h2>{book.title}</h2>
              <p className="book-author">
                {book.authors?.join(', ') || 'Unknown author'}
              </p>

              <div className="book-facts">
                {book.firstPublishYear && (
                  <span>First published {book.firstPublishYear}</span>
                )}
                {book.genres?.[0] && <span>{book.genres[0]}</span>}
              </div>

              <button
                className="secondary-action"
                type="button"
                onClick={() => chooseBook(book)}
              >
                Recommend this book
              </button>
            </div>
          </article>
        ))}
      </div>

      <form
        id="recommend-form"
        className="phase3-form"
        onSubmit={submitRecommendation}
      >
        <div className="form-heading">
          <div>
            <p className="eyebrow purple">Recommendation form</p>
            <h2>Add a book recommendation</h2>
          </div>
          <span>{selectedLabel}</span>
        </div>

        {!authenticated && (
          <div className="auth-warning">
            Search is public, but submitting a recommendation requires login.
          </div>
        )}

        <div className="form-two-col">
          <label>
            Title
            <input
              required
              value={form.title}
              onChange={event =>
                setForm({ ...form, title: event.target.value })
              }
            />
          </label>

          <label>
            Author
            <input
              required
              value={form.author}
              onChange={event =>
                setForm({ ...form, author: event.target.value })
              }
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            required
            minLength="10"
            rows="5"
            placeholder="Briefly describe the book. Search results can prefill the title and author; add a meaningful description here."
            value={form.description}
            onChange={event =>
              setForm({ ...form, description: event.target.value })
            }
          />
        </label>

        <div className="form-two-col">
          <label>
            Rating
            <select
              required
              value={form.rating}
              onChange={event =>
                setForm({ ...form, rating: event.target.value })
              }
            >
              <option value="5">5 — Excellent</option>
              <option value="4">4 — Very good</option>
              <option value="3">3 — Good</option>
              <option value="2">2 — Fair</option>
              <option value="1">1 — Poor</option>
            </select>
          </label>

          <label>
            Why do you recommend it?
            <input
              required
              minLength="3"
              placeholder="A short recommendation note"
              value={form.recommendationText}
              onChange={event =>
                setForm({
                  ...form,
                  recommendationText: event.target.value
                })
              }
            />
          </label>
        </div>

        <button
          className="primary-button phase3-submit"
          disabled={submitting || !authenticated}
        >
          {submitting ? 'Saving…' : 'Add recommendation'}
        </button>

        {formStatus && <p className="form-status">{formStatus}</p>}
        {savedBookId ? (
          <Link className="details-success-link" to={`/books/${savedBookId}`}>
            Open the book details and rating page →
          </Link>
        ) : null}
      </form>
    </section>
  );
}
