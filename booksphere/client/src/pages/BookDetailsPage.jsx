import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StarRating from '../components/StarRating.jsx';
import { getBookDetails, rateBook } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingState from '../components/LoadingState.jsx';

const EMPTY_SUMMARY = {
  average: 0,
  count: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
};

function RatingBreakdown({ summary }) {
  return (
    <div className="rating-breakdown" aria-label="Rating distribution">
      {[5, 4, 3, 2, 1].map(value => {
        const count = summary.distribution?.[value] || 0;
        const percentage = summary.count
          ? Math.round((count / summary.count) * 100)
          : 0;

        return (
          <div className="rating-row" key={value}>
            <span>{value} ★</span>
            <div className="rating-track" aria-hidden="true">
              <span style={{ width: `${percentage}%` }} />
            </div>
            <small>{count}</small>
          </div>
        );
      })}
    </div>
  );
}

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const { authenticated, loading: authLoading } = useAuth();
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (authLoading) return undefined;

    const controller = new AbortController();
    setLoading(true);
    setError('');

    getBookDetails(bookId, { signal: controller.signal })
      .then(response => {
        setBook(response.data.book);
        setRecommendations(response.data.recommendations || []);
        setSummary(response.data.ratingSummary || EMPTY_SUMMARY);
        setSelectedRating(response.data.userRating || 0);
      })
      .catch(loadError => {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [bookId, authLoading, authenticated]);

  async function submitRating(event) {
    event.preventDefault();

    if (!selectedRating) {
      setStatus('Choose a star rating before saving.');
      return;
    }

    setSubmitting(true);
    setStatus('');

    try {
      const response = await rateBook(bookId, selectedRating);
      setSummary(response.data.ratingSummary);
      setSelectedRating(response.data.userRating);
      setStatus(response.message);
      setBook(current => ({
        ...current,
        averageRating: response.data.ratingSummary.average,
        ratingsCount: response.data.ratingSummary.count
      }));
    } catch (ratingError) {
      setStatus(ratingError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || authLoading) {
    return <LoadingState label="Loading book details…" />;
  }

  if (error || !book) {
    return (
      <section className="details-error">
        <p className="eyebrow purple">Book details</p>
        <h1>We could not open this book.</h1>
        <p>{error || 'Book not found.'}</p>
        <Link className="primary-link" to="/">Back to recommendations</Link>
      </section>
    );
  }

  return (
    <section className="book-details-page">
      <Link className="back-link" to="/">← Back to recommendations</Link>

      <div className="book-details-hero">
        <div className="details-cover">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={`Cover of ${book.title}`} />
          ) : (
            <span>No cover available</span>
          )}
        </div>

        <div className="details-copy">
          <p className="eyebrow purple">BookSphere details</p>
          <h1>{book.title}</h1>
          <p className="details-authors">
            {book.authors?.join(', ') || 'Unknown author'}
          </p>

          <div className="details-rating-summary">
            <strong>{summary.average ? summary.average.toFixed(1) : 'New'}</strong>
            <span className="summary-stars" aria-label={`${summary.average} out of 5 stars`}>
              <span style={{ width: `${(summary.average / 5) * 100}%` }}>★★★★★</span>
            </span>
            <span>
              {summary.count} {summary.count === 1 ? 'rating' : 'ratings'}
            </span>
          </div>

          <div className="detail-tags">
            {book.publishedDate ? <span>Published {book.publishedDate}</span> : null}
            {book.isbn13 ? <span>ISBN-13 {book.isbn13}</span> : null}
            {book.isbn10 ? <span>ISBN-10 {book.isbn10}</span> : null}
            {book.genres?.slice(0, 6).map(genre => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <div className="book-description">
            <h2>About this book</h2>
            <p>{book.description || 'No description is available yet.'}</p>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <article className="rating-panel">
          <div>
            <p className="eyebrow purple">Community rating</p>
            <h2>{summary.average ? `${summary.average.toFixed(1)} out of 5` : 'Be the first to rate'}</h2>
          </div>
          <RatingBreakdown summary={summary} />
        </article>

        <form className="rate-book-panel" onSubmit={submitRating}>
          <p className="eyebrow purple">Your opinion</p>
          <h2>{selectedRating ? 'Update your rating' : 'Rate this book'}</h2>

          {authenticated ? (
            <>
              <StarRating
                value={selectedRating}
                onChange={setSelectedRating}
                disabled={submitting}
              />
              <button className="primary-button" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save my rating'}
              </button>
            </>
          ) : (
            <p className="auth-warning">
              <Link to="/login">Log in</Link> to rate this book. Book details and
              community ratings remain public.
            </p>
          )}

          {status ? <p className="form-status" role="status">{status}</p> : null}
        </form>
      </div>

      <section className="book-recommendations">
        <div className="panel-heading">
          <div>
            <p className="eyebrow purple">Reader notes</p>
            <h2>Why readers recommend it</h2>
          </div>
          <strong>{recommendations.length}</strong>
        </div>

        {recommendations.length ? (
          <div className="grid">
            {recommendations.map(item => (
              <article className="card" key={item._id}>
                <span>{'★'.repeat(item.rating)}</span>
                <blockquote>{item.recommendationText}</blockquote>
                <small>Recommended by {item.user?.name || 'BookSphere reader'}</small>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>No recommendation notes yet</h3>
            <p>This book can still receive independent community ratings.</p>
          </div>
        )}
      </section>
    </section>
  );
}
